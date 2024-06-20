import { useTonWallet } from '@tonconnect/ui-react';

export const Wallet = () => {
    const wallet = useTonWallet();

    return (
        wallet && (
            <div className="flex flex-col gap-2">
                <span>Connected wallet: {wallet?.name}</span>
                <span>Device: {wallet.device.appName}</span>
            </div>
        )
    );
};