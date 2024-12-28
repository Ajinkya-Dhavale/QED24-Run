import React from "react";

const Cart = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="mb-3">
          <p>{item.title} (x{item.quantity})</p>
          <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">
            Remove
          </button>
        </div>
      ))}
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
