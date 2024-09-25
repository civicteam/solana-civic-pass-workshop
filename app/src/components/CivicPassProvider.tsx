'use client';
import React, {FC, PropsWithChildren} from "react";
import {GatewayProvider} from "@civic/solana-gateway-react";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {PublicKey} from "@solana/web3.js";

// Pick your pass type...
const UNIQUENESS_PASS = new PublicKey("uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv");
const CAPTCHA_PASS = new PublicKey("ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6")
const DUMMY_PASS = new PublicKey("tgnuXXNMDLK8dy7Xm1TdeGyc95MDym4bvAQCwcW21Bf")

export const CivicPassProvider: FC<PropsWithChildren> = ({ children }) => {
    const wallet = useWallet();
    const { connection } = useConnection();

    return (
        <GatewayProvider
            wallet={wallet}
            connection={connection}
            gatekeeperNetwork={UNIQUENESS_PASS}
            cluster="devnet">
            {children}
        </GatewayProvider>
    )
};