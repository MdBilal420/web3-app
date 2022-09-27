import React from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { setAccount } from './features/stats/statsSlice';
import { useNavigate } from "react-router-dom";
function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const account = useSelector((state)=>state.stats.address)

  const connectWallet = () => {
    dispatch(setAccount())
  }

  

  if(account) return navigate("/stats")
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}

export default Home;
