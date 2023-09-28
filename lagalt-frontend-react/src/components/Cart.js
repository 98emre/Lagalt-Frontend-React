import React from "react";
import { useDispatch, useSelector } from "react-redux";
import'./cart.css';
import { decrement, increment } from "../slices/counterSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter);

  return (
    <div className="cart">
      <h2>Number of items in Cart: {count}</h2>
      <button 
        className="green"
        onClick={() => dispatch(increment())} // Dispatch the ADD_ITEM action
      >
        Add Item to Cart
      </button>
      <button 
        className="red"
        onClick={() => dispatch(decrement())} // Dispatch the DELETE_ITEM action
      >
        Remove Item from Cart
      </button>
    </div>
  );
};

export default Cart;
