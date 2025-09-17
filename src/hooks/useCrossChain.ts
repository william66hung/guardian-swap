import { useState, useEffect, useCallback } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { env } from '@/config/env';

// Cross-chain bridge ABI
const CROSS_CHAIN_BRIDGE_ABI = [
  {
    "inputs": [
      { "name": "_sourceChain", "type": "uint256" },
      { "name": "_targetChain", "type": "uint256" },
      { "name": "_amount", "type": "uint256" },
      { "name": "_recipient", "type": "address" }
    ],
    "name": "initiateBridge",
    "outputs": [{ "name": "bridgeId", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "bridgeId", "type": "uint256" }],
    "name": "getBridgeStatus",
    "outputs": [
      { "name": "status", "type": "uint8" },
      { "name": "sourceChain", "type": "uint256" },
      { "name": "targetChain", "type": "uint256" },
      { "name": "amount", "type": "uint256" },
      { "name": "recipient", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "bridgeId", "type": "uint256" }],
    "name": "completeBridge",
    "outputs": [{ "name": "success", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export interface BridgeOrder {
  id: string;
  sourceChain: string;
  targetChain: string;
  amount: string;
  recipient: string;
  status: 'pending' | 'locked' | 'bridging' | 'completed' | 'failed';
  createdAt: number;
  completedAt?: number;
  txHash?: string;
}

export interface ChainInfo {
  id: string;
  name: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export const useCrossChain = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [bridgeOrders, setBridgeOrders] = useState<BridgeOrder[]>([]);
  const [supportedChains, setSupportedChains] = useState<ChainInfo[]>([]);

  // Initialize supported chains
  useEffect(() => {
    const chains: ChainInfo[] = [
      {
        id: 'ethereum',
        name: 'Ethereum',
        chainId: 1,
        rpcUrl: 'https://mainnet.infura.io/v3/',
        explorerUrl: 'https://etherscan.io',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
      },
      {
        id: 'polygon',
        name: 'Polygon',
        chainId: 137,
        rpcUrl: 'https://polygon-rpc.com',
        explorerUrl: 'https://polygonscan.com',
        nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 }
      },
      {
        id: 'arbitrum',
        name: 'Arbitrum One',
        chainId: 42161,
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        explorerUrl: 'https://arbiscan.io',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
      },
      {
        id: 'optimism',
        name: 'Optimism',
        chainId: 10,
        rpcUrl: 'https://mainnet.optimism.io',
        explorerUrl: 'https://optimistic.etherscan.io',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
      },
      {
        id: 'base',
        name: 'Base',
        chainId: 8453,
        rpcUrl: 'https://mainnet.base.org',
        explorerUrl: 'https://basescan.org',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
      },
      {
        id: 'avalanche',
        name: 'Avalanche C-Chain',
        chainId: 43114,
        rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
        explorerUrl: 'https://snowtrace.io',
        nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 }
      }
    ];
    setSupportedChains(chains);
  }, []);

  // Get bridge status from contract
  const getBridgeStatus = useCallback(async (bridgeId: number) => {
    if (!env.CROSS_CHAIN_BRIDGE_CONTRACT) return null;
    
    try {
      // This would be a read contract call in a real implementation
      // For now, we'll simulate the response
      return {
        status: 1, // 0: pending, 1: locked, 2: bridging, 3: completed, 4: failed
        sourceChain: 1,
        targetChain: 137,
        amount: parseEther('1.0'),
        recipient: address
      };
    } catch (error) {
      console.error('Error getting bridge status:', error);
      return null;
    }
  }, [address]);

  // Initiate cross-chain bridge
  const initiateBridge = useCallback(async (
    sourceChain: string,
    targetChain: string,
    amount: string,
    recipient?: string
  ) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const sourceChainInfo = supportedChains.find(c => c.id === sourceChain);
    const targetChainInfo = supportedChains.find(c => c.id === targetChain);

    if (!sourceChainInfo || !targetChainInfo) {
      throw new Error('Unsupported chain');
    }

    try {
      const bridgeOrder: BridgeOrder = {
        id: `bridge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        sourceChain,
        targetChain,
        amount,
        recipient: recipient || address,
        status: 'pending',
        createdAt: Date.now()
      };

      // Add to local state
      setBridgeOrders(prev => [...prev, bridgeOrder]);

      // In a real implementation, this would call the bridge contract
      // For now, we'll simulate the bridge process
      await writeContract({
        address: env.CROSS_CHAIN_BRIDGE_CONTRACT as `0x${string}`,
        abi: CROSS_CHAIN_BRIDGE_ABI,
        functionName: 'initiateBridge',
        args: [
          BigInt(sourceChainInfo.chainId),
          BigInt(targetChainInfo.chainId),
          parseEther(amount),
          (recipient || address) as `0x${string}`
        ],
        value: parseEther(amount), // For ETH bridges
      });

      return bridgeOrder.id;
    } catch (err) {
      console.error('Error initiating bridge:', err);
      throw err;
    }
  }, [isConnected, address, supportedChains, writeContract]);

  // Complete bridge on destination chain
  const completeBridge = useCallback(async (bridgeId: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      // Update local state
      setBridgeOrders(prev => prev.map(order => 
        order.id === bridgeId 
          ? { ...order, status: 'bridging' as const }
          : order
      ));

      // In a real implementation, this would call the complete bridge function
      // For now, we'll simulate completion
      setTimeout(() => {
        setBridgeOrders(prev => prev.map(order => 
          order.id === bridgeId 
            ? { 
                ...order, 
                status: 'completed' as const,
                completedAt: Date.now(),
                txHash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`
              }
            : order
        ));
      }, 5000);

    } catch (err) {
      console.error('Error completing bridge:', err);
      setBridgeOrders(prev => prev.map(order => 
        order.id === bridgeId 
          ? { ...order, status: 'failed' as const }
          : order
      ));
      throw err;
    }
  }, [isConnected, address]);

  // Get estimated bridge time
  const getEstimatedBridgeTime = useCallback((sourceChain: string, targetChain: string) => {
    const chainPairs = {
      'ethereum-polygon': 15, // minutes
      'ethereum-arbitrum': 10,
      'ethereum-optimism': 5,
      'ethereum-base': 5,
      'polygon-ethereum': 30,
      'arbitrum-ethereum': 7,
      'optimism-ethereum': 7,
      'base-ethereum': 7,
    };

    const key = `${sourceChain}-${targetChain}`;
    return chainPairs[key as keyof typeof chainPairs] || 10;
  }, []);

  // Get bridge fees
  const getBridgeFees = useCallback((sourceChain: string, targetChain: string, amount: string) => {
    const baseFee = 0.001; // 0.1% base fee
    const amountNum = parseFloat(amount);
    const fee = amountNum * baseFee;
    
    return {
      fee: fee.toString(),
      feePercentage: baseFee * 100,
      totalCost: (amountNum + fee).toString()
    };
  }, []);

  return {
    // State
    isConnected,
    address,
    bridgeOrders,
    supportedChains,
    
    // Bridge functions
    initiateBridge,
    completeBridge,
    getBridgeStatus,
    
    // Utility functions
    getEstimatedBridgeTime,
    getBridgeFees,
    
    // Transaction state
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash
  };
};
