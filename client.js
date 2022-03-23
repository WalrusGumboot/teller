const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3

const provider_devnet = new anchor.Provider(
  new anchor.web3.Connection("https://api.devnet.solana.com", "confirmed"),
  anchor.Wallet.local(),
  {
    commitment: "confirmed",
    preflightCommitment: "confirmed"
  }
);

anchor.setProvider(provider_devnet)
const prov = anchor.Provider.local();

class AnchorProgramma {
  constructor() {
    this.idl = JSON.parse(
      require("fs").readFileSync("./target/idl/teller.json", "utf8")
    );
  
    this.programId = new anchor.web3.PublicKey("J6ePGpGFxu76Ygq1uwvSvLdNqWwhsq4o2uXMJ9GiDm2g");
    this.program   = new anchor.Program(this.idl, this.programId);

    this.teller = undefined
  }

  async nieuweTeller() {
    const nieuweTeller = anchor.web3.Keypair.generate();

    // publicKey
    // privateKey
  
    await this.program.rpc.maak(
      prov.wallet.publicKey,
      {
        accounts: {
          teller:        nieuweTeller.publicKey,
          gebruiker:     prov.wallet.publicKey,
          systemProgram: SystemProgram.programId
        },
        signers: [nieuweTeller] // prov.wallet zit hier door Anchor automatisch al bij!
      }
    );
    
    console.log(nieuweTeller);

    return nieuweTeller;
  }

  async voegToe() {
    console.log("Aan het toevoegen")
    
    await this.program.rpc.voegToe({
      accounts: {
        teller:     this.teller.publicKey,
        autoriteit: prov.wallet.publicKey,
      },
      //signers: [prov.wallet.publicKey]
    });

    console.log("Alles gaat lekker, we hebben ééntje toegevoegd aan de waarde.")
  }
}

async function main() {
  let p = new AnchorProgramma();
  p.teller = await p.nieuweTeller()

  await p.voegToe();

  // let counterAccount = await program.account.counter.fetch(counter.publicKey);
  let tellerAccount = await p.program.account.getal.fetch(p.teller.publicKey);
  
  console.log("Nieuw getal: ", tellerAccount.inhoud.toNumber())
}

console.log("Running client.");
main().then(() => console.log("Success"));