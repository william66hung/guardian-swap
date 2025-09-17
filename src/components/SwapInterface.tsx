import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useGuardianSwap } from '@/hooks/useGuardianSwap';
import { toast } from 'sonner';

const SwapInterface = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [minAmountOut, setMinAmountOut] = useState('');
  
  const { 
    isConnected, 
    createSwapOrder, 
    isPending, 
    isConfirming, 
    isConfirmed,
    error,
    userBalance 
  } = useGuardianSwap();
  
  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', chain: 'Ethereum', address: '0x0000000000000000000000000000000000000000' },
    { symbol: 'MATIC', name: 'Polygon', chain: 'Polygon', address: '0x0000000000000000000000000000000000000001' },
    { symbol: 'ARB', name: 'Arbitrum', chain: 'Arbitrum', address: '0x0000000000000000000000000000000000000002' },
    { symbol: 'OP', name: 'Optimism', chain: 'Optimism', address: '0x0000000000000000000000000000000000000003' },
  ];

  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!fromAmount || !toAmount) {
      toast.error('Please enter amounts for both tokens');
      return;
    }

    if (!minAmountOut) {
      toast.error('Please set minimum amount out');
      return;
    }

    try {
      const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      
      await createSwapOrder(
        fromToken.address,
        toToken.address,
        fromAmount,
        minAmountOut,
        deadline
      );
      
      toast.success('Swap order created successfully!');
    } catch (err) {
      console.error('Swap error:', err);
      toast.error('Failed to create swap order');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-border/50 glow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-center justify-center">
          <Shield className="w-5 h-5 text-accent" />
          Hidden Cross-Chain Swap
        </CardTitle>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            {isEncrypted ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>FHE {isEncrypted ? 'Enabled' : 'Disabled'}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEncrypted(!isEncrypted)}
            className="h-6 px-2 text-xs"
          >
            Toggle
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* From Section */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">From</div>
          <div className="relative">
            <Input
              type="number"
              placeholder={isEncrypted ? "••••••••" : "0.0"}
              value={isEncrypted ? "••••••••" : fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              disabled={isEncrypted}
              className="pr-24 bg-secondary/50 border-border/50"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">
                  {fromToken.symbol.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium">{fromToken.symbol}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Chain: {fromToken.chain}</div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={swapTokens}
            className="rounded-full w-10 h-10 p-0 border border-border/50 hover:border-primary/50"
          >
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        {/* To Section */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">To</div>
          <div className="relative">
            <Input
              type="number"
              placeholder={isEncrypted ? "••••••••" : "0.0"}
              value={isEncrypted ? "••••••••" : toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              disabled={isEncrypted}
              className="pr-24 bg-secondary/50 border-border/50"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                <span className="text-xs font-bold text-accent-foreground">
                  {toToken.symbol.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium">{toToken.symbol}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Chain: {toToken.chain}</div>
        </div>

        {/* Encryption Status */}
        {isEncrypted && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Order Encrypted</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your swap details are encrypted using FHE technology, preventing MEV attacks until execution on the destination chain.
            </p>
          </div>
        )}

        {/* Minimum Amount Out */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Minimum Amount Out</div>
          <Input
            type="number"
            placeholder="0.0"
            value={minAmountOut}
            onChange={(e) => setMinAmountOut(e.target.value)}
            className="bg-secondary/50 border-border/50"
          />
        </div>

        {/* User Balance */}
        {isConnected && (
          <div className="text-sm text-muted-foreground">
            Balance: {userBalance} ETH
          </div>
        )}

        {/* Swap Button */}
        <Button 
          className="w-full glow-accent" 
          size="lg"
          onClick={handleSwap}
          disabled={!isConnected || isPending || isConfirming}
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {isPending ? 'Creating Order...' : 'Confirming...'}
            </>
          ) : (
            isEncrypted ? 'Create Hidden Swap' : 'Create Swap'
          )}
        </Button>

        {/* Error Display */}
        {error && (
          <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950 p-2 rounded">
            Error: {error.message}
          </div>
        )}

        {/* Success Message */}
        {isConfirmed && (
          <div className="text-sm text-green-500 bg-green-50 dark:bg-green-950 p-2 rounded">
            Swap order created successfully!
          </div>
        )}

        {/* Network Status */}
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Networks Online</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>FHE Active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SwapInterface;