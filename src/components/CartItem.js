import React from 'react';

function CartItem({ item, onIncrease, onDecrease, onDelete }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} width="80" />
      <div className="cart-info">
        <h3>{item.name}</h3>
        <p>USD{item.price} </p>
        <div className="cart-controls">
          <button onClick={() => onDecrease(item)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrease(item)}>+</button>
        </div>
        <p>Subtotal: USD{item.quantity * item.price}</p>
        <button onClick={() => onDelete(item)} className="delete-btn">Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
