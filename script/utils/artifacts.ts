// Import Node.js modules for reading files and working with paths
import { readFileSync } from "fs";  // For reading file contents
import { join } from "path";        // For safely joining paths across OS

/**
 * Loads Starknet contract artifacts (Sierra + CASM) from the filesystem
 * 
 * @param name - The base name of the contract artifact (e.g., "starknet_contract_HelloStarknet")
 * @param baseDir - The base directory from which relative paths are resolved
 * @returns An object containing:
 *          - sierra: The JSON content of the Sierra contract artifact
 *          - casm: The JSON content of the compiled CASM contract artifact
 */
function loadContractArtifacts(name: string, baseDir: string) {
  return {
    // Load the Sierra artifact
    sierra: JSON.parse(
      readFileSync(
        join(
          baseDir, // Start from the provided base directory
          `../../../starknet_contract/target/dev/${name}.contract_class.json` // Path to the Sierra JSON
        ),
        "utf-8" // Read file as UTF-8 string
      )
    ),

    // Load the compiled CASM artifact
    casm: JSON.parse(
      readFileSync(
        join(
          baseDir, // Start from the same base directory
          `../../../starknet_contract/target/dev/${name}.compiled_contract_class.json` // Path to the compiled CASM JSON
        ),
        "utf-8" // Read file as UTF-8 string
      )
    ),
  };
}

// Export the function for use in deploy or declare scripts
export { loadContractArtifacts };
