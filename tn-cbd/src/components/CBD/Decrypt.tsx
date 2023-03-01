import React from "react";
import { providers } from "ethers";
import type { PolicyMessageKit } from "@nucypher/nucypher-ts";

const subscription = ["bronze", "silver", "gold"];

function Decrypt({
  depStrategy,
  conditionSets,
  encryptedMessages,
  setDecryptedMessages,
  setDecMessagesStatus,
}: any) {
  const decrypt = async () => {
    if (!depStrategy.decrypter) return;

    setDecryptedMessages([]);
    setDecMessagesStatus("decrypting...");

    let blogPosts: Object[] = [];
    const web3Provider = new providers.Web3Provider(window.ethereum);
    const decrypter = depStrategy.decrypter;

    for (let i = 0; i < encryptedMessages.length; i++) {
      const conditionContext = conditionSets[i].buildContext(web3Provider);
      const retrievedMessages = await decrypter.retrieve(
        [encryptedMessages[i]],
        conditionContext
      );
      const decryptedMessages = retrievedMessages.map(
        (mk: PolicyMessageKit) => {
          if (mk.isDecryptableByReceiver()) {
            const decryptedMessage = decrypter.decrypt(mk);
            const decoded = new TextDecoder().decode(decryptedMessage);
            const posts = JSON.parse(decoded);
            blogPosts = blogPosts.concat(posts);
          }

          if (Object.values(mk.errors).length > 0) {
            Object.entries(mk.errors).map(([address, error]) =>
              console.log(
                `Subscription ${subscription[i]} message: ${address} - ${error}`
              )
            );
          }
        }
      );
    }

    setDecryptedMessages(JSON.stringify(blogPosts));
    setDecMessagesStatus("decrypted")
  };

  return (
    <button className="cbd-button" onClick={decrypt}>
      Step 4. Decrypt posts
    </button>
  );
}

export default Decrypt;
