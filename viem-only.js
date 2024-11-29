const { http, createPublicClient } = require("viem");
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

const CHAIN_ID = 1;

const wagmiAbi = [
  {
    inputs: [],
    name: "mint",
    outputs: [{ name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
];

const account = privateKeyToAccount(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
);

const main = async () => {
  const publicClient = createPublicClient({
    // signer: account,
    chain: getViemChain(CHAIN_ID),
    transport: http(),
  });

  const { result } = await publicClient.simulateContract({
    address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
    abi: wagmiAbi,
    functionName: "mint",
    account,
  });
};

main();
