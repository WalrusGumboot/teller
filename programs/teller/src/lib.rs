use anchor_lang::prelude::*;

declare_id!("J6ePGpGFxu76Ygq1uwvSvLdNqWwhsq4o2uXMJ9GiDm2g");

#[program]
pub mod teller {
    use super::*;

    pub fn maak(ctx: Context<Maker>, autoriteit: Pubkey) -> Result<()> {
        let teller = &mut ctx.accounts.teller;

        teller.autoriteit = autoriteit;
        teller.inhoud     = 0;

        Ok(())
    }

    pub fn voegToe(ctx: Context<Opteller>) -> Result<()> {
        let teller = &mut ctx.accounts.teller;
        teller.inhoud += 1;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Maker<'info> {
    #[account(init, payer = gebruiker, space = 8 + 40)]
    pub teller: Account<'info, Getal>,

    #[account(mut)]
    pub gebruiker: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Opteller<'info> {
    #[account(mut, has_one = autoriteit)]
    pub teller: Account<'info, Getal>,
    pub autoriteit: Signer<'info>
}

#[account]
pub struct Getal {
    pub autoriteit: Pubkey,
    pub inhoud: u64,
}
