import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  address: null,
  transactions : null,
  blockHeight:null
};

export const setAccount = createAsyncThunk(
  'stats/setAccount',
  async (payload,{fulfillWithValue}) => {
    if (typeof window.ethereum !== 'undefined') {
      const acc = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return fulfillWithValue(acc[0])
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'fetchTransactions',
  async(payload,{fulfillWithValue,getState}) => {
    console.log(getState())
    let data = JSON.stringify({
      "jsonrpc": "2.0",
      "id": 0,
      "method": "alchemy_getAssetTransfers",
      "params": [
        {
          "fromBlock": "0x0",
          "fromAddress": getState().stats.address,
          category: ["external", "internal", "erc20", "erc721", "erc1155"],
        }
      ]
    });
    
      var requestOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: data,
      };
    
      const apiKey = "4lsxLKL-vRzVgAI9JN2NPZ0veKM_lzph"
      const baseURL = `https://eth-goerli.g.alchemy.com/v2/${apiKey}`;
      const axiosURL = `${baseURL}`;
    
      try {
        const response = await axios(axiosURL, requestOptions)
        console.log("res",response)
        const {status, data} = response
        if(status === 200){
          return fulfillWithValue(data.result['transfers'])
        }
      } catch (error) {
        console.log(error)
      } 
  }
)

export const fetchBlockHeight = createAsyncThunk(
  'getBlockHeight',
  async(payload,{fulfillWithValue}) => {

    const apiKey = "4lsxLKL-vRzVgAI9JN2NPZ0veKM_lzph"
  const options = {
    method: 'POST',
    url: `https://eth-goerli.g.alchemy.com/v2/${apiKey}`,
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    data: {id: 1, jsonrpc: '2.0', method: 'eth_blockNumber'}
  };

    try {
      const response = await axios.request(options)
      console.log("res",response)
      const {status, data} = response
      if(status === 200){
        return fulfillWithValue(data.result)
      }
    } catch (error) {
      console.log(error)
    }

  }
)
export const statsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
  },
  
  extraReducers: {
    [setAccount.fulfilled] : (state,action) => {
      state.address = action.payload
    },
    [fetchTransactions.fulfilled] : (state,action) => {
      state.transactions = action.payload
    },
    [fetchBlockHeight.fulfilled] : (state,action) => {
      state.blockHeight = action.payload
    }
  },
});


export const selectCount = (state) => state.counter.value;


export default statsSlice.reducer;
