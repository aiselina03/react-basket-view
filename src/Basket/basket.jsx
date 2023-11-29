import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./style.scss";

function Basket() {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState(
    localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  fetch("https://fakestoreapi.com/products/")
    .then((res) => res.json())
    .then((api) => setData(api));

  function handleAddBasket(item) {
    let itemIndex = basket.findIndex((x) => x.id === item.id);
    // console.log(itemIndex);
    if (itemIndex !== -1) {
      const newBasket = [...basket];
      newBasket[itemIndex].count++;
      setBasket(newBasket);
    } else {
      setBasket([...basket, { ...item, count: 1 }]);
    }
  }
  function handleRemove(id) {
    setBasket(basket.filter((x) => x.id !== id));
  }

  function setCountValue(isAdd, item) {
    let itemIndex = basket.findIndex((x) => x.id === item.id);
    const newBasket = [...basket];
    if (isAdd) {
      newBasket[itemIndex].count++;
      setBasket(newBasket);
    } else {
      if (newBasket[itemIndex].count > 1) {
        newBasket[itemIndex].count--;
        setBasket(newBasket);
      }
    }
  }

  return (
    <div className="home">
      <h2>Basket</h2>
      <table border={1}>
        <tr>
          <th>Image</th>
          <th>Price</th>
          <th>Count</th>
          <th>Delete</th>
        </tr>
        {basket.map((item) => (
          <tr className="cardtable" key={item.id}>
            <td>
              <img width={110} src={item.image} alt="" />
            </td>

            <td>$ {item.count * item.price}</td>
            <td>
              <div className="count">
                <button
                  className="minus"
                  onClick={() => setCountValue(false, item)}
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  className="plus"
                  onClick={() => setCountValue(true, item)}
                >
                  +
                </button>
                <br />
              </div>
            </td>
            <td>
              <button className="remove" onClick={() => handleRemove(item.id)}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </table>
      <hr />
      <h2>Products</h2>
      <div className="cards">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>
              <span>$</span>
              {item.price}
            </p>
            <button onClick={() => handleAddBasket(item)}>add basket</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Basket;
