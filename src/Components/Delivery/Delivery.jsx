import React, { useState } from 'react';
import donut from '../../assets/img/pic.png';
import './delivery.scss';

export default function Delivery({closeModal, addDeliveryInfo}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [adress, setAdress] = useState('');
  const [floor, setFloor] = useState('');
  const [deliveryType, setDeliveryType] = useState('delivery');

  const deliveryTypeFunc = (event) => {
    setDeliveryType(event.target.value);
  };

  return (
    <div className="delivery__overlay">
      <div className="delivery">
        <button className='closeBtn' onClick={closeModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
            <rect x="7.0752" y="8.28249" width="1" height="20" transform="rotate(-45 7.0752 8.28249)" fill="#B1B1B1" />
            <rect x="7.78223" y="22.4246" width="1" height="20" transform="rotate(-135 7.78223 22.4246)" fill="#B1B1B1" />
          </svg>
        </button>
        <div className="delivery__img">
          <img src={donut} alt="donut" />
        </div>
        <div className="delivery__form">
          <h1 className="delivery__title">Delivery</h1>
          <input type="text" placeholder='Your name' value={name} onChange={e => setName(e.target.value)}/>
          <input type="tel" placeholder='Your number' value={number} onChange={e => setNumber(e.target.value)}/>
          <label htmlFor="pickup">
            <input
              type="radio"
              id='pickupInput'
              value='pickup'
              checked={deliveryType === 'pickup'}
              onChange={deliveryTypeFunc}
            />
            Pickup
          </label>
          <label htmlFor="delivery">
            <input
              type="radio"
              id='deliveryInput'
              value='delivery'
              checked={deliveryType === 'delivery'}
              onChange={deliveryTypeFunc}
            />
            Delivery
          </label>
          <input type="text" placeholder='Address' value={adress} onChange={e => setAdress(e.target.value)}/>
          <input type="text" placeholder='Floor' value={floor} onChange={e => setFloor(e.target.value)}/>
          <button onClick={() => {
            addDeliveryInfo(name,number,adress,floor);
            setName('');
            setNumber('');
            setAdress('');
            setFloor('');
          }}>Submit</button>
        </div>
      </div>
    </div>
  )
}
