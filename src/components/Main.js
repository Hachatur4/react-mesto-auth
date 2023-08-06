import React from 'react'
import Card from './Card.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import Header from './Header.js';

function Main (props) {

  const currentUser = React.useContext(CurrentUserContext);
  const onCardClick = props.onCardClick
  const onCardLike = props.onCardLike
  const onCardLikeDelete = props.onCardLikeDelete
  const onCardDelete = props.onCardDelete


  return (
    <>
      <Header loggedIn={props.loggedIn} linkTitle={'Выйти'} link={'login'} userEmail={props.userEmail}/>
      <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <span className="profile__avatar-pencil"></span>
            <img
              className="profile__avatar-image"
              src={currentUser.avatar}
              alt="Изображение профиля"
            />
          </div>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile-content profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile-content profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button"  onClick={props.onAddPlace}></button>
      </section>
      <section className="element">
      {props.cards.map((card) =>(
        <Card
        key={card._id}
        card={card}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardLikeDelete={onCardLikeDelete}
        onCardDelete={onCardDelete}
        />
        ))}
      </section>
    </main>
    </>
  )
}

export default Main;