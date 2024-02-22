import { Routes, Route } from "react-router-dom";
import Page from "../../Pages/Page/Page";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Error from "../../Pages/Error/Error";
import data from "../../data.json";
import { useState, useEffect } from "react";
import {
  arrBurgerImg,
  arrDesertImg,
  arrHotdogImg,
  arrSaucesImg,
  arrPizzaImg,
  arrShawarmaImg,
  arrSnackImg,
} from "../../picture";

export default function Structure() {
  const [basket, setBasket] = useState(() => {
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  });

  useEffect(() => {
    if (basket.length > 0) {
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }, [basket]);

  const addBasket = (basketElem) => {
    setBasket((prev) => {
      const existingItem = prev.find((item) => item.id === basketElem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === basketElem.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prev, { ...basketElem, count: 1 }];
      }
    });
  };

  const plusBasket = (id) => {
    setBasket((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count + 1 };
        } else {
          return item;
        }
      })
    );
  };

  const minusBasket = (id) => {
    const count = basket.find((item) => item.id == id).count;
    if (count == 1) {
      setBasket((prev) => prev.filter((item) => item.id != id));
      localStorage.removeItem("basket");
    } else {
      setBasket((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, count: item.count - 1 };
          } else {
            return item;
          }
        })
      );
    }
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Page
              addBasket={addBasket}
              plusBasket={plusBasket}
              minusBasket={minusBasket}
              basket={basket}
              pageImages={arrBurgerImg}
              pageTitle={data[0].burgers.title}
              pageData={data[0].burgers.items}
            />
          }
        />
        <Route
          path="/hotdogs"
          element={
            <Page
              basket={basket}
              addBasket={addBasket}
              plusBasket={plusBasket}
              minusBasket={minusBasket}
              pageImages={arrHotdogImg}
              pageTitle={data[0].hotdogs.title}
              pageData={data[0].hotdogs.items}
            />
          }
        />
        <Route
          path="/snacks"
          element={
            <Page
              basket={basket}
              addBasket={addBasket}
              plusBasket={plusBasket}
              minusBasket={minusBasket}
              pageImages={arrSnackImg}
              pageTitle={data[0].snacks.title}
              pageData={data[0].snacks.items}
            />
          }
        />
        <Route
          path="/shawarmas"
          element={
            <Page
              basket={basket}
              addBasket={addBasket}
              plusBasket={plusBasket}
              minusBasket={minusBasket}
              pageImages={arrShawarmaImg}
              pageTitle={data[0].shawarmas.title}
              pageData={data[0].shawarmas.items}
            />
          }
        />
        <Route
          path="/pizzas"
          element={
            <Page
              basket={basket}
              addBasket={addBasket}
              plusBasket={plusBasket}
              minusBasket={minusBasket}
              pageImages={arrPizzaImg}
              pageTitle={data[0].pizzas.title}
              pageData={data[0].pizzas.items}
            />
          }
        />
        <Route
          path="/deserts"
          element={
            <Page
              basket={basket}
              addBasket={addBasket}
              plusBasket={plusBasket}
              minusBasket={minusBasket}
              pageImages={arrDesertImg}
              pageTitle={data[0].deserts.title}
              pageData={data[0].deserts.items}
            />
          }
        />
        <Route
          path="/sauces"
          element={
            <Page
              basket={basket}
              addBasket={addBasket}
              plusBasket={plusBasket}
              minusBasket={minusBasket}
              pageImages={arrSaucesImg}
              pageTitle={data[0].sauces.title}
              pageData={data[0].sauces.items}
            />
          }
        />
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
