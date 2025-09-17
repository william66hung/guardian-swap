// Environment configuration for Guardian Swap
export const env = {
  // Chain Configuration
  CHAIN_ID: import.meta.env.VITE_CHAIN_ID || '11155111',
  RPC_URL: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990',
  
  // Wallet Connect Configuration
  WALLET_CONNECT_PROJECT_ID: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475',
  
  // Infura Configuration
  INFURA_API_KEY: import.meta.env.VITE_INFURA_API_KEY || 'b18fb7e6ca7045ac83c41157ab93f990',
  
  // Contract Addresses (to be deployed)
  GUARDIAN_SWAP_CONTRACT: import.meta.env.VITE_GUARDIAN_SWAP_CONTRACT || '',
  FHE_CONTRACT: import.meta.env.VITE_FHE_CONTRACT || '',
  CROSS_CHAIN_BRIDGE_CONTRACT: import.meta.env.VITE_CROSS_CHAIN_BRIDGE_CONTRACT || '',
} as const;
