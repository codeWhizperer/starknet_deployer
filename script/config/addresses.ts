// Import the NetworkConfig type for strong typing of network properties
import type { NetworkConfig } from "../lib/types.js";

// Define supported Starknet networks with their configuration
export const NETWORKS = {
  // Sepolia Testnet configuration
  "starknet-sepolia": {
    // Human-readable name for the network
    name: "Sepolia Testnet",

    // Default deployer account address for this network
    deployer:
      "",
  },

  // Starknet Mainnet configuration
  "starknet-mainnet": {
    name: "Starknet Mainnet",
    deployer:
      "", // Default deployer account address for this network
  },
} as const satisfies Record<string, NetworkConfig>;
