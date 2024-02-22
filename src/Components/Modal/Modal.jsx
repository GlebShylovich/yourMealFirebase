import "./modal.scss";

export default function Modal({ closeModal, content, addBasket }) {
  console.log(content);
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal">
        <button className="modal__close" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <rect
              x="7.0752"
              y="8.28249"
              width="1"
              height="20"
              transform="rotate(-45 7.0752 8.28249)"
              fill="#B1B1B1"
            />
            <rect
              x="7.78223"
              y="22.4246"
              width="1"
              height="20"
              transform="rotate(-135 7.78223 22.4246)"
              fill="#B1B1B1"
            />
          </svg>
        </button>
        <div className="modal__name">{content.name}</div>
        <div className="modal__info">
          <div className="modal__img">
            <img src={content.image} alt="img" />
          </div>
          <div className="modal__text">
            <p className="modal__text-desc">{content.desc}</p>
            <div className="modal__text-ingredients">
              <div className="modal__text-ingredients-title">Ingredients:</div>
              <div className="modal__text-content">
                {Object.values(content.ingredients).map((ingredient, index) => (
                  <p key={index}>{ingredient}</p>
                ))}
              </div>
            </div>
            <p className="modal__text-weight">
              {content.weight}g, ccal {content.calories}
            </p>
          </div>
        </div>
        <div className="modal__other">
          <button
            onClick={() => {
              addBasket(content);
            }}
          >
            Add to basket
          </button>
          <p className="modal__price">{content.price}$</p>
        </div>
      </div>
    </div>
  );
}
