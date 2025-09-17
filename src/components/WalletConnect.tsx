import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';
import { useAccount } from 'wagmi';

const WalletConnect = () => {
  const { isConnected, address } = useAccount();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-accent/50 text-accent">
          <Wifi className="w-3 h-3 mr-1" />
          Connected
        </Badge>
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary/50 border border-border/50">
          <span className="text-sm font-mono">{truncateAddress(address)}</span>
        </div>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="border-muted/50 text-muted-foreground">
        <WifiOff className="w-3 h-3 mr-1" />
        Not Connected
      </Badge>
      <ConnectButton />
    </div>
  );
};

export default WalletConnect;