import { TonConnectButton } from "@tonconnect/ui-react";

export const Header = () => {
  return (
    <header className="flex flex-col gap-4 w-full justify-center align-center">
      <span>My App with React UI</span>
      <TonConnectButton />
    </header>
  );
};
