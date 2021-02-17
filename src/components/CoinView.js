import React from 'react';
import {useState, useEffect} from 'react';
import "../index.css";
import {useQuery, NetworkStatus, gql} from "@apollo/client";

export default function CoinView() { 

const EXCHANGE_COIN = gql`query{
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

const { loading, error, data, refetch, networkStatus } = useQuery(EXCHANGE_COIN);

console.log({loading, error, data})


// Server Console checks
if (networkStatus === NetworkStatus.refetch) {
 console.log("Refetching!");
}


  const [coinData, setCoinData] = useState([]);
  
  const [updateCoinData, setUpdateCoinData] = useState(coinData);


   //re-render page
   const [render, setRender] = useState();

   const handleShowCoins = () => {
     setRender(coinData);
   }; 

  // Local Storage
const storeObj = localStorage.setItem("coin", JSON.stringify(coinData));
localStorage.getItem("coin")

React.useEffect(() => {
  if(data && data.coins){ setCoinData(data.coins)}
}, [data]);

const handleHide = (id) => {
  let updateList = coinData.filter(coin => coin.id !== id);
  setUpdateCoinData(updateList);
     }; 

const ExchangeRates = () => {

    return  coinData.length && coinData.map(({ id, name, nameid, price_usd, symbol,  price_btc, percent_change_1h,
    percent_change_7d,
    percent_change_24h,
    csupply,
    tsupply,
    msupply,
    market_cap_usd}) => (
   
      <div className="coin-box" key={coinData.id}>
       <h2 style={{color:"black"}}>{name}</h2>  
       
        <p>Price In USD: {price_usd}</p>
         <p> {nameid}</p>
         <p>{symbol}</p>
         <button onClick={() => handleDisplayInfo(id)} className="btn-style">Show More Info</button>
         
           <div className="btn-remove-position">
           <button onClick={() => handleHide(coinData.id)} className="btn-style">Remove Coin</button>
           </div>
           
      </div>
    
  ));
    }

 
    if (loading == false && !error) {
 
      ExchangeRates();
      
      } else{
        console.log("Loading not completed, Errors found!!");
      }


  

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
