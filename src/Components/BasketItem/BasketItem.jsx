import React from 'react'

import './basketItem.scss'

export default function BasketItem({item, minusBasket, plusBasket}) {
    return (
        <div className="basket__item">
            <div className="basket__item-image">
                <img src={item.image} alt="img" />
            </div>
            <div className="basket__item-info">
                <p className='basket__item-name'>{item.name}</p>
                <p className='basket__item-weight'>{item.weight}g</p>
                <p className='basket__item-price'>${item.price}</p>
            </div>
            <div className="basket__item-count">
                <button onClick={() => minusBasket(item.id)}>-</button>
                <span>{item.count}</span>
                <button onClick={() => plusBasket(item.id)}>+</button>
            </div>
        </div>
    )
}
