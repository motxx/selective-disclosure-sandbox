import React from "react";
import { Mumbai, useEthers } from "@usedapp/core";
import { providers } from "ethers";
import { Cohort, Strategy } from "@nucypher/nucypher-ts";

function StrategyBuilder({ setDepStrategy, setDepStrategyStatus }: any) {
  const { switchNetwork } = useEthers();

  const strategyBuild = async () => {
    setDepStrategyStatus("deploying...");

    const cohortConfig = {
      threshold: 3,
      shares: 5,
      porterUri: "https://porter-tapir.nucypher.community",
    };

    await switchNetwork(Mumbai.chainId);
    const web3Provider = new providers.Web3Provider(window.ethereum);

    const cohort = await Cohort.create(cohortConfig);
    const strategy = Strategy.create(cohort);

    const deployedStrategy = await strategy.deploy(
      `blog-subscription-${Math.floor(Math.random() * 100)}`,
      web3Provider
    );

    setDepStrategy(deployedStrategy);
    setDepStrategyStatus(deployedStrategy.label);
  };

  return (
    <button className="cbd-button" onClick={strategyBuild}>
      Step 2. Deploy Strategy
    </button>
  );
}

export default StrategyBuilder;
