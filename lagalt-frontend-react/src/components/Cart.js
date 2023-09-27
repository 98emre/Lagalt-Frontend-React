import React from "react";
import { useDispatch, useSelector } from "react-redux";
import'./cart.css';

const Cart = () => {
  // Access the number of items from Redux state
  const numOfItems = useSelector((state) => state.numOfItems);

  // Get the dispatch method
  const dispatch = useDispatch();

  return (
    <div className="cart">
      <h2>Number of items in Cart: {numOfItems}</h2>
      <button 
        className="green"
        onClick={() => dispatch({ type: 'ADD_ITEM' })} // Dispatch the ADD_ITEM action
      >
        Add Item to Cart
      </button>
      <button 
        className="red"
        onClick={() => dispatch({ type: 'DELETE_ITEM' })} // Dispatch the DELETE_ITEM action
      >
        Remove Item from Cart
      </button>
    </div>
  );
};

export default Cart;
