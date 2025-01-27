import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Alert, Button } from "react-bootstrap"

const Coin = ({
    name,
    price,
    symbol,
    marketcap,
    volume,
    image,
    priceChange
  }) => {
    return (
      
      <div className='coin-container'>
        <div className='coin-row'>
          <div className='coin'>
            <img src={image} alt='crypto' />
            <h1>{name}</h1>
            <p className='coin-symbol'>Symbol: {symbol}</p>
          </div>
          <div className='coin-data'>
            <p className='coin-price' >Coin Price: ${price}</p>
            <p className='coin-volume'>Coin Volume: ${volume.toLocaleString()}</p>
  
            {priceChange < 0 ? (
              <p className='coin-percent red'>Percent Change: {priceChange.toFixed(2)}%</p>
            ) : (
              <p className='coin-percent green'>Percent Change: +{priceChange.toFixed(2)}%</p>
            )}
  
            <p className='coin-marketcap'>
              Market Cap: ${marketcap.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  };

export const Search = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=225&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    
    <div className='coin-app'>
      <div className='coin-search'>
      <br></br>
        <h4 className='coin-text'>Cryptocurrency Search</h4>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
        <br></br>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

