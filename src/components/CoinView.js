import React from 'react';
import {useState, useEffect} from 'react';
import "../index.css";
import gql from "graphql-tag";
import {useQuery} from "@apollo/client";

export default function CoinView() { 

const EXCHANGE_COIN = gql`
  query {
  coins {
    id
    name
    nameid
    price_usd
    price_btc
    percent_change_1h
    percent_change_7d
    percent_change_24h
    csupply
    tsupply
    msupply
    market_cap_usd
    symbol
  }
}
`;

const { loading, error, data } = useQuery(EXCHANGE_COIN) 

// Server Console checks


   // return dataLocal ? JSON.parse(storedData) : [];

// Local Storage
//localStorage.setItem("coin", JSON.stringify(coinData));
localStorage.getItem("coin")


const arrData = data.coins;

const [coinData, setCoinData] = useState(arrData);

var [updateCoinData, setUpdateCoinData] = useState(coinData);


const ExchangeRates = () => {

  if (loading) {
    return <p>Loading...</p>;
  }
  else if (error) {
    return <p>Error :(</p>;
    } else {

    return data.coins.map(({ id, name, nameid, price_usd, symbol,  price_btc, percent_change_1h,
    percent_change_7d,
    percent_change_24h,
    csupply,
    tsupply,
    msupply,
    market_cap_usd}) => (
   
      <div className="coin-box" key={data.coins.symbol}>
       <h2 style={{color:"black"}}>{name}</h2>  
       
        <p>Price In USD: {price_usd}</p>
         <p> {nameid}</p>
         <p>{symbol}</p>
         <button onClick={() => handleDisplayInfo(symbol)} className="btn-style">Show More Info</button>
         
           <div className="btn-remove-position">
           <button onClick={() => handleHide(data.coins.symbol)} className="btn-style">Remove Coin</button>
           </div>
           
      </div>
    
  ));
    }

} 


 //re-render page
    const [render, setRender] = useState();

    const handleShowCoins = () => {
      setRender(coinData);
    }; 
 


const handleHide = (symbol) => {
let updateList = coinData.filter(coin => coin.symbol !== symbol);
setCoinData(updateList);
    }; 

  

   const handleDisplayInfo= (id) => {
    let additional = `<p>{percent_change_7d}</p>
    <p>{percent_change_24h}</p>
   <p>{csupply}</p> 
    <p>{tsupply}</p>
    <p>{msupply}</p>`;
     console.log('id: ', id)
    } 
   
  
   

    return (
        <div>
        
        <div className="coin-container">
        
        <div>
        {<button className="btn-style-all" onClick={ () => handleShowCoins()}>Show All Coins</button>}
        </div>
       <ExchangeRates />

        
        </div>
            
        </div>
    )
}
