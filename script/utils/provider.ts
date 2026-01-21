// Import Starknet SDK classes for RPC interaction and account management
import { RpcProvider, Account } from "starknet";

// Import custom types and network config
import { NetworkName } from "../lib/types.js";
import { NETWORKS } from "../config/addresses.js";

// Import environment-based node URLs (Infura / Alchemy)
import { INFURA_STARKNET_NODE_URL, ALCHEMY_STARKNET_NODE_URL } from "../utils/network.js"; 

// ---------------------------------------------
// PROVIDER INITIALIZATION
// ---------------------------------------------

// Create a Starknet provider connected to the chosen RPC node
// Currently using Alchemy endpoint; could switch to Infura if desired
const PROVIDER = new RpcProvider({ nodeUrl: ALCHEMY_STARKNET_NODE_URL });

// Determine the correct private key based on the network environment
const PRIVATE_KEY =
  process.env.STARKNET_ENV === "starknet-mainnet"
    ? process.env.MAINNET_PRIVATE_KEY   // Use mainnet key if deploying to mainnet
    : process.env.TESTNET_PRIVATE_KEY;  // Otherwise use testnet key

// Determine the network name based on environment variable or default to Sepolia
const NETWORK_NAME = (process.env.STARKNET_ENV || "starknet-sepolia") as NetworkName;

// ---------------------------------------------
// VALIDATION
// ---------------------------------------------
if (!PRIVATE_KEY || PRIVATE_KEY === "") {
  throw new Error("PRIVATE_KEY is not set in environment variables");
}

// ---------------------------------------------
// ACCOUNT INSTANCE
// ---------------------------------------------
// Initialize a reusable Account object for deployment and contract interactions
export const ACCOUNT_INSTANCE = new Account({
  provider: PROVIDER,                       // RPC provider to communicate with Starknet
  address: NETWORKS[NETWORK_NAME].deployer, // Account address to sign transactions
  signer: PRIVATE_KEY,                       // Private key used to sign transactions
});
