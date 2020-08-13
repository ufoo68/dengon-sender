import React, { useState, useCallback } from "react";
import useWebSocket from "react-use-websocket";

const App = () => {
  const { sendMessage } = useWebSocket("wss://dengon-server.glitch.me");
  const [message, setMessage] = useState("");

  const handleClickSendMessage = useCallback(() => {
    sendMessage(message);
    setMessage("");
  }, [message]);

  return (
    <div>
      <img src="https://cdn.glitch.com/6d19d0e1-8cc2-4941-b3be-f3e99143b8c6%2Flogo.jpg?v=1596326143792" />
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleClickSendMessage}>送信</button>
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

export default App;
