import React from 'react';
import { func, number, object } from 'prop-types';

const Item = ({ handlePurchaseItem, item, money }) => (
  <div className="item">
    <header>
      <h2>{item.name}</h2>
      <h3>${item.value}</h3>
    </header>
    {handlePurchaseItem && (
      <button
        className="purchase"
        disabled={item.value > money}
        onClick={() => handlePurchaseItem(item)}
      >
        Buy
      </button>
    )}
    {typeof item.quantity === 'number' && (
      <p>
        <strong>Quantity:</strong> {item.quantity}
      </p>
    )}
  </div>
);

Item.propTypes = {
  handlePurchaseItem: func,
  item: object.isRequired,
  money: number.isRequired,
};

export default Item;
