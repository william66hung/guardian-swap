import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { env } from '@/config/env';

// Contract ABI (simplified for demonstration)
const GUARDIAN_SWAP_ABI = [
  {
    "inputs": [
      {"name": "_tokenIn", "type": "address"},
      {"name": "_tokenOut", "type": "address"},
      {"name": "_amountIn", "type": "uint256"},
      {"name": "_minAmountOut", "type": "uint256"},
      {"name": "_deadline", "type": "uint256"}
    ],
    "name": "createSwapOrder",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_orderId", "type": "uint256"}],
    "name": "executeSwap",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserBalance",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "orderId", "type": "uint256"}],
    "name": "getSwapOrderInfo",
    "outputs": [
      {"name": "tokenIn", "type": "address"},
      {"name": "tokenOut", "type": "address"},
      {"name": "user", "type": "address"},
      {"name": "isActive", "type": "bool"},
      {"name": "isCompleted", "type": "bool"},
      {"name": "timestamp", "type": "uint256"},
      {"name": "deadline", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const useGuardianSwap = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Read user balance
  const { data: userBalance, refetch: refetchBalance } = useReadContract({
    address: env.GUARDIAN_SWAP_CONTRACT as `0x${string}`,
    abi: GUARDIAN_SWAP_ABI,
    functionName: 'getUserBalance',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!env.GUARDIAN_SWAP_CONTRACT,
    },
  });

  // Create swap order (no direct transfers, uses order system)
  const createSwapOrder = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    minAmountOut: string,
    deadline: number
  ) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      await writeContract({
        address: env.GUARDIAN_SWAP_CONTRACT as `0x${string}`,
        abi: GUARDIAN_SWAP_ABI,
        functionName: 'createSwapOrder',
        args: [
          tokenIn as `0x${string}`,
          tokenOut as `0x${string}`,
          parseEther(amountIn),
          parseEther(minAmountOut),
          BigInt(deadline)
        ],
      });
    } catch (err) {
      console.error('Error creating swap order:', err);
      throw err;
    }
  };

  // Execute swap
  const executeSwap = async (orderId: number) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      await writeContract({
        address: env.GUARDIAN_SWAP_CONTRACT as `0x${string}`,
        abi: GUARDIAN_SWAP_ABI,
        functionName: 'executeSwap',
        args: [BigInt(orderId)],
      });
    } catch (err) {
      console.error('Error executing swap:', err);
      throw err;
    }
  };

  // Get swap order info
  const getSwapOrderInfo = (orderId: number) => {
    return useReadContract({
      address: env.GUARDIAN_SWAP_CONTRACT as `0x${string}`,
      abi: GUARDIAN_SWAP_ABI,
      functionName: 'getSwapOrderInfo',
      args: [BigInt(orderId)],
      query: {
        enabled: !!env.GUARDIAN_SWAP_CONTRACT,
      },
    });
  };

  return {
    // State
    isConnected,
    address,
    userBalance: userBalance ? formatEther(userBalance) : '0',
    
    // Transaction state
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
    
    // Functions
    createSwapOrder,
    executeSwap,
    getSwapOrderInfo,
    refetchBalance,
  };
};
