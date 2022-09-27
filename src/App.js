import React, { useState } from 'react';


function App() {

  const [account,setAccount] = useState(null)

  const connectWallet = async() => {
    console.log("first")
    if (typeof window.ethereum !== 'undefined') {
      const acc =await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('MetaMask is installed!',acc);
      setAccount(acc[0])
    }
  }

  return (
    <div className="App">
      {account && <p>Account:{account}</p>}
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}

export default App;
