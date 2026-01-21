// Import Node.js modules for file reading and path handling
import { readFileSync } from "fs";           // For reading file contents
import { join, dirname } from "path";        // For safely constructing file paths
import { fileURLToPath } from "url";         // To get __dirname in ES modules

// ES Module equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Loads Sierra + CASM artifacts specifically for contract declaration.
 * 
 * @param artifactName - Name of the contract artifact (e.g., "starknet_contract_HelloStarknet")
 * @returns An object containing:
 *          - sierra: The Sierra contract JSON used for declaration
 *          - casm: The compiled CASM contract JSON used for declaration
 * 
 *  This loader is scoped for declaration because the path is relative to the
 *    `starknet_contract` folder and ensures that the correct artifacts are loaded
 *    for the declare step, not deployment.
 */
export function loadContractArtifactsForDeclare(artifactName: string) {
  // Base path pointing to where compiled contracts are stored
  const basePath = join(__dirname, "../../starknet_contract/target/dev");

  // Construct full paths for Sierra and CASM files
  const sierraPath = join(basePath, `${artifactName}.contract_class.json`);
  const casmPath = join(basePath, `${artifactName}.compiled_contract_class.json`);

  // Read and parse the JSON files
  const sierra = JSON.parse(readFileSync(sierraPath, "utf-8"));
  const casm = JSON.parse(readFileSync(casmPath, "utf-8"));

  // Safety check: ensure the Sierra artifact is valid
  if (!sierra.contract_class_version) {
    throw new Error(`Invalid Sierra artifact: ${sierraPath}`);
  }

  // Return both artifacts
  return { sierra, casm };
}
