"use server";

import {AnchorProvider, Program} from "@coral-xyz/anchor";
import {GatedAirdrop} from "@/types/gated_airdrop";
import GatedAirdropIDL from "@/types/gated_airdrop.json";
import {airdropAddress, connection, keypair} from "@/lib/solana";
import NodeWallet from "@coral-xyz/anchor/dist/esm/nodewallet";
import {PublicKey} from "@solana/web3.js";

const provider = new AnchorProvider(connection, new NodeWallet(keypair), {});
const program = new Program<GatedAirdrop>(GatedAirdropIDL as GatedAirdrop, provider);

export const claim = async (recipient: string, pass: string) => {
    const airdrop = await program.account.airdrop.fetchNullable(airdropAddress);

    console.log("Airdrop:", airdrop);
    console.log("Mint:", airdrop?.mint)

    if (!airdrop) throw new Error("Could not find airdrop " + airdropAddress);

    return program.methods.claim().accounts({
        payer: program.provider.publicKey,
        airdrop: airdropAddress,
        recipient,
        pass: new PublicKey(pass),
    }).rpc();
}