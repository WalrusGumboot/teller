import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Teller } from "../target/types/teller";

describe("teller", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Teller as Program<Teller>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
