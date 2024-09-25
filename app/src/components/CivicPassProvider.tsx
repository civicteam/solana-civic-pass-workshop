"use client";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {GatewayProvider} from "@civic/solana-gateway-react";
import {PropsWithChildren} from "react";
import {PublicKey} from "@solana/web3.js";

const UNIQUENESS_PASS = new PublicKey("uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv");

export const CivicPassProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const wallet = useWallet();
    const { connection } = useConnection();

    return <GatewayProvider
        connection={connection}
        wallet={wallet}
        cluster="devnet"
        gatekeeperNetwork={UNIQUENESS_PASS}
    >{children}
    </GatewayProvider>;
}