import { InjectedConnector } from "@web3-react/injected-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const fortmatic = new FortmaticConnector({
  apiKey: "pk_test_4A297C7E43E8B639",
  chainId: 4,
});
