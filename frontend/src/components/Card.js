import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `elements__like-btn ${
    isLiked ? "elements__like-btn_active" : ""
  }`;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `elements__delete-btn ${
    isOwn ? "" : "elements__delete_hidden"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="elements__item">
      <img
        className="elements__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="elements__info">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__likes">
          <button
            onClick={handleLikeClick}
            type="button"
            aria-label="Нравится"
            title="Нравится"
            className={`elements__like-btn ${cardLikeButtonClassName}`}
          ></button>
          <span className="elements__numberoflikes">
            {props.card.likes.length}
          </span>
        </div>
        {isOwn && (
          <button
            onClick={handleDeleteClick}
            className={`elements__delete-btn ${cardDeleteButtonClassName}`}
            type="button"
            aria-label="Удалить картинку"
            title="Удалить картинку"
          />
        )}
      </div>
    </li>
  );
}

export default Card;
