import { NETWORKS } from "../config/addresses.js";
// This extracts the keys from NETWORKS as a union type
export type NetworkName = keyof typeof NETWORKS;

export interface NetworkConfig {
  name: string;
  deployer: string;
}


export type ContractToDeclare = {
  name: string;
  artifactName: string;
};
