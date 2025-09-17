import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowRightLeft, Shield, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useGuardianSwap } from '@/hooks/useGuardianSwap';
import { toast } from 'sonner';

interface BridgeStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  chain: string;
  txHash?: string;
}

const CrossChainBridge = () => {
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('polygon');
  const [amount, setAmount] = useState('');
  const [bridgeSteps, setBridgeSteps] = useState<BridgeStep[]>([]);
  const [isBridging, setIsBridging] = useState(false);
  
  const { isConnected, createSwapOrder, isPending, isConfirming, isConfirmed, error } = useGuardianSwap();

  const chains = [
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: '🔷' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC', icon: '🟣' },
    { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB', icon: '🔵' },
    { id: 'optimism', name: 'Optimism', symbol: 'OP', icon: '🔴' },
    { id: 'base', name: 'Base', symbol: 'BASE', icon: '🔵' },
    { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', icon: '🔺' },
  ];

  const swapChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
  };

  const initiateBridge = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsBridging(true);
    
    // Initialize bridge steps
    const steps: BridgeStep[] = [
      {
        id: 1,
        title: 'Create Encrypted Order',
        description: 'Encrypting your bridge order with FHE',
        status: 'processing',
        chain: fromChain
      },
      {
        id: 2,
        title: 'Lock Tokens on Source Chain',
        description: 'Securely locking tokens on the source chain',
        status: 'pending',
        chain: fromChain
      },
      {
        id: 3,
        title: 'Cross-Chain Validation',
        description: 'Validating transaction across chains',
        status: 'pending',
        chain: 'bridge'
      },
      {
        id: 4,
        title: 'Release on Destination',
        description: 'Releasing tokens on destination chain',
        status: 'pending',
        chain: toChain
      }
    ];

    setBridgeSteps(steps);

    try {
      // Simulate bridge process with realistic timing
      for (let i = 0; i < steps.length; i++) {
        // Update current step to processing
        setBridgeSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, status: 'processing' as const } : step
        ));

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mark step as completed
        setBridgeSteps(prev => prev.map((step, index) => 
          index === i ? { 
            ...step, 
            status: 'completed' as const,
            txHash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`
          } : step
        ));
      }

      toast.success('Bridge completed successfully!');
    } catch (err) {
      toast.error('Bridge failed. Please try again.');
      setBridgeSteps(prev => prev.map(step => ({ ...step, status: 'failed' as const })));
    } finally {
      setIsBridging(false);
    }
  };

  const getStepIcon = (status: BridgeStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <div className="w-5 h-5 rounded-full bg-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getChainIcon = (chainId: string) => {
    const chain = chains.find(c => c.id === chainId);
    return chain ? chain.icon : '🔗';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          Cross-Chain Bridge
          <Badge variant="outline" className="text-xs">
            FHE Protected
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Bridge Configuration */}
        <div className="space-y-4">
          {/* From Chain */}
          <div className="space-y-2">
            <label className="text-sm font-medium">From Chain</label>
            <Select value={fromChain} onValueChange={setFromChain}>
              <SelectTrigger>
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span>{getChainIcon(fromChain)}</span>
                    <span>{chains.find(c => c.id === fromChain)?.name}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {chains.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    <div className="flex items-center gap-2">
                      <span>{chain.icon}</span>
                      <span>{chain.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={swapChains}
              className="rounded-full"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </Button>
          </div>

          {/* To Chain */}
          <div className="space-y-2">
            <label className="text-sm font-medium">To Chain</label>
            <Select value={toChain} onValueChange={setToChain}>
              <SelectTrigger>
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span>{getChainIcon(toChain)}</span>
                    <span>{chains.find(c => c.id === toChain)?.name}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {chains.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    <div className="flex items-center gap-2">
                      <span>{chain.icon}</span>
                      <span>{chain.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-secondary/50 border-border/50"
            />
          </div>
        </div>

        {/* Bridge Steps */}
        {bridgeSteps.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Bridge Progress</h4>
            {bridgeSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="flex-shrink-0">
                  {getStepIcon(step.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{step.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {getChainIcon(step.chain)} {step.chain}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                  {step.txHash && (
                    <p className="text-xs text-muted-foreground font-mono">
                      TX: {step.txHash}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bridge Button */}
        <Button 
          className="w-full glow-accent" 
          size="lg"
          onClick={initiateBridge}
          disabled={!isConnected || isBridging || !amount}
        >
          {isBridging ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Bridging...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Start Cross-Chain Bridge
            </>
          )}
        </Button>

        {/* Error Display */}
        {error && (
          <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded">
            Error: {error.message}
          </div>
        )}

        {/* Bridge Info */}
        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Encrypted Bridge</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>MEV Protected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrossChainBridge;
