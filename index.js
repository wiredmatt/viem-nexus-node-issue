const { createNexusClient } = require("@biconomy/sdk");
const { http } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");

const chains = require("viem/chains");

/**
 * Gets the chain object for the given chain id.
 * @param chainId - Chain id of the target EVM chain.
 * @returns Viem's chain object.
 */
function getViemChain(chainId) {
  for (const chain of Object.values(chains)) {
    if ("id" in chain) {
      if (chain.id === chainId) {
        return chain;
      }
    }
  }

  throw new Error(`Chain with id ${chainId} not found`);
}

const account = privateKeyToAccount(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
);

const CHAIN_ID = 137;

const bundlerUrl = "https://cluster.unhosted.com/aa/bundler/";

const main = async () => {
  const nexusClient = await createNexusClient({
    signer: account,
    chain: getViemChain(CHAIN_ID),
    transport: http(),
    bundlerTransport: http(bundlerUrl),
  });

  const address = nexusClient.account.address;

  console.log(address);
};

main();
// yarn start
// yarn run v1.22.22
// $ node index.js
// /home/matt/work/viem-nexus-node-test/node_modules/@biconomy/sdk/dist/_cjs/account/toNexusAccount.js:58
//         throw new Error("Failed to get counterfactual account address");
//               ^

// Error: Failed to get counterfactual account address
//     at getCounterFactualAddress (/home/matt/work/viem-nexus-node-test/node_modules/@biconomy/sdk/dist/_cjs/account/toNexusAccount.js:58:15)
//     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
//     at async toNexusAccount (/home/matt/work/viem-nexus-node-test/node_modules/@biconomy/sdk/dist/_cjs/account/toNexusAccount.js:63:29)
//     at async createNexusClient (/home/matt/work/viem-nexus-node-test/node_modules/@biconomy/sdk/dist/_cjs/clients/createNexusClient.js:13:26)
//     at async main (/home/matt/work/viem-nexus-node-test/index.js:33:23)

// Node.js v20.12.2
// error Command failed with exit code 1.
// info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
