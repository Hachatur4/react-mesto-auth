import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  )

  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick(){
    isLiked ?
    props.onCardLikeDelete(props.card)
    : props.onCardLike(props.card)
  }

  function handleDeleteClick(){
    props.onCardDelete(props.card)
  }

  return (
    <article className="card">
      {isOwn && <button type="button" className="card__delete" onClick={()=>{handleDeleteClick()}}/>}
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={()=>{handleClick()}}
      />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likeBox">
          <button type="button"  onClick={()=>{handleLikeClick()}} className={cardLikeButtonClassName}/>
          <span className="card__numberLikes">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card