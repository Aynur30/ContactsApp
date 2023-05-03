import React, { useState } from "react";

function ListWithButtons() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    const newItem = prompt("Enter a new item:");
    setItems([...items, newItem]);
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>
      <h2>List with Buttons</h2>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListWithButtons;
