
import { useSelector, useDispatch } from 'react-redux';

import { fetchBlockHeight, fetchTransactions } from './statsSlice';
import { useNavigate } from "react-router-dom";

import styles from './stats.module.css';
import { useEffect } from 'react';

export function Stats() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const account = useSelector((state)=>state.stats.address)
  const transactions = useSelector((state) => state.stats.transactions)
  const blockHeight = useSelector((state) => state.stats.blockHeight)
  
  const getTransactions = () => {
    dispatch(fetchTransactions())
  }

  const getBlockHeight = () => {
    dispatch(fetchBlockHeight())
  }

  useEffect(()=>{
    if(!account) navigate("/")
  },[account,navigate])

  return (
    <div>
      <div className={styles.row}>
        <p>Account: {account}</p>
        <button onClick={()=>navigate("/dashboard")}>Go To  Dashboard</button>
        
      </div>
      <br />
        <button
          className={styles.button}
          onClick={getTransactions}>
            Get Transactions
        </button>
        {transactions && transactions.map(({from,hash,blockNum,to})=><div key={hash}>
          <p><span style={{fontWeight:"bold"}}>Block Number:</span> {blockNum}</p>
          <p><span style={{fontWeight:"bold"}}>Hash:</span> {hash}</p>
          <p><span style={{fontWeight:"bold"}}>From:</span> {from}</p>
          <p><span style={{fontWeight:"bold"}}>To:</span> {to}</p>

        </div>)}

        <button
          className={styles.button}
          onClick={getBlockHeight}>
            Get Block Height
        </button>
        {blockHeight && <p>{blockHeight}</p>}
    </div>
  );
}
