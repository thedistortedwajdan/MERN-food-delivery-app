import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

// import { Link } from "react-router-dom";
// Link
export default function Card(props) {
  // console.log(props.name);
  const dispatch = useDispatchCart();
  let option = props.options ?? {};
  let priceOptions = Object.keys(option);
  const data = useCart();
  const priceRef = useRef();
  // const foodItems = props.foodItems;
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
  const AddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
        // food = item;
      }
    }
    try {
      if (food !== [] && food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img,
        });
      }
    } catch (error) {
      alert(error);
    }
  };
  let finalPrice = qty * parseInt(option[size]);
  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);
  return (
    <>
      <div
        className="card m-3"
        style={{ width: "18rem", maxHeight: "380px", className: "card" }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "180px", objectFit: "fill" }}
        />
        <div className="card-body">
          <div className="d-inline h-100 rounded bg-white text-black fs-4">
            {props.foodItem.name}
          </div>
          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success rounded"
              ref={priceRef}
              onChange={(e) => setsize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 text-success fs-6">
              Rs{finalPrice}/-
            </div>
            <hr />
            <button
              className={`btn btn-success justify-center ms-2 text-white `}
              onClick={AddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
