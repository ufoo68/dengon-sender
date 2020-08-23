import React, { useState, useCallback, useEffect } from "react";
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";

const channels = ["dengonban"];

const pubnub = new PubNub({
  publishKey: "pub-c-8d987bab-a38d-4bd9-824e-ecaae28a167b",
  subscribeKey: "sub-c-aaa4ba70-dc94-11ea-b260-b6ccfb19765d"
});

const DengonBan = () => {
  const pubnub = usePubNub();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    pubnub.addListener({
      message: messageEvent => {
        setMessages([...messages, messageEvent.message]);
      }
    });

    pubnub.subscribe({ channels });
  }, [messages]);

  const sendMessage = useCallback(
    async message => {
      await pubnub.publish({
        channel: channels[0],
        message
      });

      setInput("");
    },
    [pubnub, setInput]
  );

  return (
    <div>
      <img src="https://cdn.glitch.com/6d19d0e1-8cc2-4941-b3be-f3e99143b8c6%2Flogo.jpg?v=1596326143792" />
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button
        onClick={e => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        送信
      </button>
      <footer>
        Logo is created by{" "}
        <a
          href="https://www.designevo.com/jp/logo-maker/"
          title="無料オンラインロゴメーカー"
        >
          DesignEvo
        </a>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <PubNubProvider client={pubnub}>
      <DengonBan />
    </PubNubProvider>
  );
};

export default App;
