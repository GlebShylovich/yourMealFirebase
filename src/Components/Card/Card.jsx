import './card.scss'

export default function Card({ item, openModal, setObjModal, addBasket }) {
  return (
    <div className="card" onClick={() => { openModal(); setObjModal(item) }}>
      <div className="card__img">
        <img src={item.image} alt="img" />
      </div>
      <div className="card__text">
        <p className="card__text-price">${item.price}</p>
        <p className="card__text-name">{item.name}</p>
        <p className="card__text-weight">{item.weight}g</p>
        <button className="card__text-btn" onClick={(e) => {
          e.stopPropagation(); addBasket(item)
        }
        }>Add to basket</button>
      </div>
    </div>
  )
}