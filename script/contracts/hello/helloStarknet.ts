import { Contract } from "starknet";
import { ACCOUNT_INSTANCE } from "../../utils/provider.js";
import { NETWORKS,  } from "../../config/addresses.js";
import {  NETWORK_NAME } from "../../utils/network.js";
import { loadContractArtifacts } from "../../utils/artifacts.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function deployHelloStarknetContract() {
  try {
    console.log("📦 Deploying HelloStarknet...");
    console.log("Deployer:", NETWORKS[NETWORK_NAME].deployer);

    const { sierra, casm } = loadContractArtifacts(
      "starknet_contract_HelloStarknet",
      __dirname,
    );

    const contract = await Contract.factory({
      contract: sierra,
      casm,
      account: ACCOUNT_INSTANCE,
    });

    console.log("✅ HelloStarknet deployed at:", contract.address);
    return { address: contract.address };
  } catch (error) {
    console.error("❌ HelloStarknet deployment failed:", error);
    throw error;
  }
}
