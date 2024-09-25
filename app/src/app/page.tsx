'use client';

import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import balloon from './balloon.svg';
import Image from "next/image";
import {FC, PropsWithChildren} from "react";
import {useAirdrop} from "@/components/AirdropProvider";
import {IdentityButton, useGateway} from "@civic/solana-gateway-react";
import {GatewayStatus} from "@civic/gateway-client-react/dist/esm/types/gateway";

const Balloon: FC = () => <Image src={balloon} alt="balloon" width={269} height={304}/>

const Notification: FC<PropsWithChildren<{}>> = ({children}) => <div className="notification">
    {children}
</div>

const Dashboard = () => {
    const {balance, claim, isConfirming, error, txHash} = useAirdrop();
    const { gatewayStatus } = useGateway();

    const passIsActive = gatewayStatus === GatewayStatus.ACTIVE;

    return (
        <>
            <IdentityButton className="civic-button app-button"/>
            <button
                className="app-button"
                disabled={!passIsActive}
                onClick={claim}>{ passIsActive ? "Claim Airdrop" : "Verify first!"}
            </button>

            {isConfirming && <Notification>Claiming</Notification>}

            {!!balance && <Notification>Congratulations, you have a token!</Notification>}
            {txHash && <Notification><>Transaction: {txHash}</>
            </Notification>}
            {error && <Notification><>Error: {error.message}</>
            </Notification>}
        </>)
}

export default function Home() {
    return (
        <div className="App">
            <Balloon/>

            <h1>Claim Airdrop</h1>

            <WalletMultiButton/>
            <Dashboard/>
        </div>
    )
};