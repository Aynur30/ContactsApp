import React, { useState } from 'react';
import axios from 'axios';
import './crud.css';




function Succeses() {


  return (
    <div>
        Wallet
    </div>
  );
}

/*
function DeleteItemButton({ id }) {
  const handleClick = async () => {
    try {
      const response = await axios.delete(`/items/${id}`);
      console.log('Item deleted');
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleClick}>Delete</button>;
}
*/
export default Succeses;
