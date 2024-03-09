import "./basket.scss";
import BasketItem from "../BasketItem/BasketItem";
import Delivery from "../Delivery/Delivery";
import scooter from "../../assets/img/basket-delivery.png";
import { useState, useEffect } from "react";

export default function Basket({ basket, plusBasket, minusBasket }) {
  const total = basket.reduce((acc, item) => acc + item.price * item.count, 0);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState([]);
  const [isOpenBasket, setOpenBasket] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);
  const openModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const addDeliveryInfo = (name, number, adress, floor) => {
    const copyDeliveryInfo = [...deliveryInfo];
    const obj = { date: Date.now(), name, number, adress, floor, basket };
    copyDeliveryInfo.push(obj);
    setDeliveryInfo(copyDeliveryInfo);
    setOpenBasket(false);
    console.log(copyDeliveryInfo);
  };
  const toggleBasket = () => {
    setOpenBasket(!isOpenBasket);
  };
  useEffect(() => {
    if (total > 10) {
      setFreeDelivery(true);
    } else {
      setFreeDelivery(false);
    }
  }, [total]);
  return (
    <div className={`basket ${isOpenBasket ? "basket--open" : ""}`}>
      <div className="basket__top" onClick={toggleBasket}>
        <div className="basket__title">Basket</div>
        <div className="basket__amount">{basket.length}</div>
      </div>
      <div className="basket__content">
        <div className="basket__list">
          {basket.length === 0 ? (
            <h2 className="emptyBasket">Basket is empty</h2>
          ) : (
            basket.map((item, index) => (
              <BasketItem
                key={index}
                item={item}
                minusBasket={minusBasket}
                plusBasket={plusBasket}
              />
            ))
          )}
        </div>
        <div className="basket__total">
          <p className="basket__total-text">Total</p>
          <p className="basket__total-price">{total.toFixed(2)}$</p>
        </div>
        <button
          className="basket__btn"
          onClick={() => {
            if (basket.length === 0) {
              const emptyBasketElement = document.querySelector(".emptyBasket")
              emptyBasketElement.classList.add("emptyBasket--red");
              setTimeout(() => {
                emptyBasketElement.classList.remove("emptyBasket--red");
              }, 1000);
            } else {
              openModal();
            }
          }}
        >
          Make an order
        </button>
        {freeDelivery && (
          <div className="basket__delivery">
            <div className="basket_delivery-img">
              <img src={scooter} alt="image" />
            </div>
            <div className="basket__delivery-text">Free delivery</div>
          </div>
        )}
        {isOpenModal && (
          <Delivery closeModal={closeModal} addDeliveryInfo={addDeliveryInfo} />
        )}
      </div>
    </div>
  );
}
