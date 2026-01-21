# Starknet Contract Deployer Template

A simple and modular template to **declare and deploy Starknet contracts** (Cairo 1 / Sierra + CASM) using Node.js. Supports multiple contracts, networks, and reusable account instances.

---

## 🚀 Features

- Declare and deploy contracts on **Sepolia testnet** or **Mainnet**  
- Supports **multiple contracts** in one run  
- Handles **Sierra + CASM** artifacts automatically  
- Uses **Starknet SDK** `Account` and `RpcProvider`  
- Environment-based network configuration  

---

## ⚡ Prerequisites

- Node.js >= 18  
- npm or yarn  
- Starknet account with funds for deployment  
- Environment variables:  

```env
STARKNET_ENV=starknet-sepolia   # or starknet-mainnet
TESTNET_PRIVATE_KEY=your_testnet_private_key
MAINNET_PRIVATE_KEY=your_mainnet_private_key
ALCHEMY_STARKNET_NODE_URL=<your_alchemy_rpc_url>
INFURA_STARKNET_NODE_URL=<your_infura_rpc_url>
```

## 📂 Project Structure
starknet_contract_deployer/
├─ script/
│  ├─ index.ts            # Entry point for deployment
│  ├─ declare.ts          # Declare all contracts
│  ├─ contracts/          # Contract-specific deploy scripts
│  ├─ utils/              # Helpers: artifacts, provider, network
├─ starknet_contract/
│  └─ target/dev/         # Compiled contract artifacts (Sierra + CASM)


## ⚙️ Usage

1. Install dependencies

```bash
npm install
```

2. Declare contracts

```bash
npm run declare
```

3. Deploy contracts

```bash
npm run deploy
```

4. Add new contracts

Add the contract artifact to `starknet_contract/target/dev/`

Add a new deploy function under `script/contracts/`

Import it in index.ts for batch deployment


## 🔧 Notes

Contract declaration is one-time per class hash. Re-declaring will be skipped.

Deployment requires sufficient account balance for gas fees.

Supports both Sepolia testnet and Mainnet automatically via STARKNET_ENV.


## 📖 References

[Starknet.js Documentation](https://starknetjs.com/docs/guides/intro/)

[Starknet.js SDK](https://www.npmjs.com/package/starknet)

[Cairo Book](https://www.starknet.io/cairo-book/)