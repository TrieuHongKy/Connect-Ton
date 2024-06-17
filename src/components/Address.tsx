import { useTonAddress } from '@tonconnect/ui-react';

export const Address = () => {
    const userFriendlyAddress = useTonAddress();
    console.log('userFriendlyAddress', userFriendlyAddress)
    const rawAddress = useTonAddress(false);
    console.log('rawAddress', rawAddress)

    return (
        userFriendlyAddress && rawAddress && (
            <div>
                <span>User-friendly address: {userFriendlyAddress}</span>
            </div>
        )
    );
};