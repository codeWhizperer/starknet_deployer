#!/usr/bin/env ts-node

import "dotenv/config";
import { loadContractArtifactsForDeclare } from "./utils/declare-artifact.js";
import { ACCOUNT_INSTANCE } from "./utils/provider.js";
import { fileURLToPath } from "url";
// import { dirname, join } from "path";

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// ---------------------------
// Define contracts to declare
// ---------------------------
// Users can just add more contracts here
const CONTRACTS_TO_DECLARE = [
  {
    name: "HelloStarknet",
    artifactName: "starknet_contract_HelloStarknet",
  },
  {
    name: "ControlledVault",
    artifactName: "starknet_contract_ControlledVault",
  },
  // Add more contracts here as needed
];

// ---------------------------
// Declare a single contract
// ---------------------------
async function declareContract(contract: { name: string; artifactName: string }) {
  try {
    console.log(`\n📝 Declaring ${contract.name}...`);

    const { sierra, casm } = loadContractArtifactsForDeclare(contract.artifactName);

    const declareResponse = await ACCOUNT_INSTANCE.declare({ contract: sierra, casm });
    await ACCOUNT_INSTANCE.waitForTransaction(declareResponse.transaction_hash);

    console.log(`✅ ${contract.name} declared with class hash: ${declareResponse.class_hash}`);
    return declareResponse.class_hash;
  } catch (error: any) {
    if (error.message?.includes("already declared") || error.message?.includes("Class already declared")) {
      console.log(`ℹ️ ${contract.name} already declared, skipping...`);
      return null;
    }
    console.error(`❌ Failed to declare ${contract.name}:`, error.message || error);
    throw error;
  }
}

// ---------------------------
// Declare all contracts
// ---------------------------
async function declareAllContracts() {
  console.log("🚀 Starting contract declaration...\n");
  console.log("=".repeat(60));

  const declaredClasses: Record<string, string> = {};
  const skippedClasses: string[] = [];

  for (const contract of CONTRACTS_TO_DECLARE) {
    const classHash = await declareContract(contract);
    if (classHash) {
      declaredClasses[contract.name] = classHash;
    } else {
      skippedClasses.push(contract.name);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 Declaration process complete!");
  console.log("Declared contracts:", Object.keys(declaredClasses));
  console.log("Skipped contracts (already declared):", skippedClasses);

  return declaredClasses;
}

// ---------------------------
// Execute when run
// ---------------------------
declareAllContracts()
  .then(() => {
    console.log("\n✅ All contracts processed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Declaration process failed:", error);
    process.exit(1);
  });
