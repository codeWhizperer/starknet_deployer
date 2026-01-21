import { NetworkName } from "../lib/types.js";
const network = process.env.STARKNET_ENV || "starknet-sepolia";
const ALCHEMY_STARKNET_NODE_URL = `https://${network}.g.alchemy.com/starknet/version/rpc/${process.env.ALCHEMY_API_KEY}`;
const INFURA_STARKNET_NODE_URL = `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`;
const NETWORK_NAME = (process.env.STARKNET_ENV ||
  "starknet-sepolia") as NetworkName;

// Multiple Starknet RPC providers are configured (Infura & Alchemy) to improve reliability.
// If one provider is rate-limited, unstable, or temporarily unavailable,
// we can easily switch to the other without changing deployment logic.
export { ALCHEMY_STARKNET_NODE_URL, INFURA_STARKNET_NODE_URL, NETWORK_NAME };


