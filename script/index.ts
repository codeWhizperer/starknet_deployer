import "dotenv/config";
import { NETWORK_NAME } from "./utils/network.js";
import { deployHelloStarknetContract } from "./contracts/hello/helloStarknet.js";
import { deployVaultContract } from "./contracts/vault/vault.js";

async function main() {
  console.log("\n🚀 Starknet Contract Deployer");
  console.log(`📡 Network: ${NETWORK_NAME}`);
  console.log("=".repeat(60));

  try {
    const hello = await deployHelloStarknetContract();
    const vault = await deployVaultContract();

    console.log("\n" + "=".repeat(60));
    console.log("🎉 DEPLOYMENT COMPLETE\n");
    console.log(`HelloStarknet: ${hello.address}`);
    console.log(`ControlledVault: ${vault.address}`);
    console.log("=".repeat(60));
  } catch (error) {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  }
}

main();
