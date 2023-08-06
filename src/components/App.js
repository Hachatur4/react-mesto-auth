import {React, useState, useEffect} from 'react';
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup.js'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import api from '../utils/api.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import Login from './login.js'
import Register from './Register'
import InfoTooltip from './InfoTooltip.js'
import ProtectedRouteElement from './ProtectedRoute';
import imgTooltipOk from '../images/popup/popup-status-ok.svg';
import imgTooltipErr from '../images/popup/popup-status-error.svg';
import * as auth from '../utils/auth.js';


function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [infoTooltipOk, setInfoTooltipOk] = useState(false);
  const [infoTooltipErr, setInfoTooltipErr] = useState(false);
  const [userEmail,setUserEmail] = useState({})

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const navigate = useNavigate()

  const handleLogin = () => {
    setLoggedIn(true);
  }

  useEffect(() => {
    handleTokenCheck();
  }, [])

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res){
            setUserEmail(res.data.email)
            setLoggedIn(true);
            navigate("/cards", {replace: true})
          }
      });
    }
  }

  function handleRegistrationStatusOk(){
    setInfoTooltipOk(true)
  }
  function handleRegistrationStatusErr(){
    setInfoTooltipErr(true)
  }

  useEffect(() => {
    api.getAppInfo()
      .then(([cards, userData])=>{
        setCards(cards)
        setCurrentUser(userData)
      })
      .catch((err)=> console.log(`catch: ${err}`))
  },[]);

  function handleEditAvatarClick (){
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick (){
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick (){
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
    setInfoTooltipOk(false)
    setInfoTooltipErr(false)
  }

  function handleCardLike(card){
      api.putLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err)=> console.log(`catch: ${err}`))
  }
  function handleCardLikeDelete(card){
    api.deleteLike(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  function handleCardDelete(card){
    api.deleteCard(card._id)
    .then((newCard) => {
      setCards((state) => state.filter((c) => c._id != card._id));
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  function handleUpdateUser(data){
    api.sendUserInfo(data)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  function handleUpdateAvatar(data){
    api.userAvatar(data)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  function handleAddPlaceSubmit (cardData){
    api.createCard(cardData)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/cards" element={
            <ProtectedRouteElement
            loggedIn={loggedIn}
            element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardLikeDelete={handleCardLikeDelete}
            cards={cards}
            onCardDelete={handleCardDelete}
            userEmail={userEmail}
           />
          } />
          <Route path="/register" element={
            <Register
              loggedIn={loggedIn}
              onfoTooltipOk={handleRegistrationStatusOk}
              infoTooltipErr={handleRegistrationStatusErr}/>
          } />
          <Route path="/login" element={
            <Login loggedIn={loggedIn} handleLogin={handleLogin}/>
          } />
          <Route path="*" element={loggedIn ? <Navigate to="/cards" replace /> : <Navigate to="/login" replace />} />
        </Routes>
      <InfoTooltip 
        isOpen={infoTooltipOk} 
        onClose={closeAllPopups} 
        img={imgTooltipOk}
        imgAlt={'Изображение успешного статуса регистрации'}
        titleStatus={'Вы успешно зарегистрировались!'}/>
      <InfoTooltip
        isOpen={infoTooltipErr} 
        onClose={closeAllPopups}
        img={imgTooltipErr}
        imgAlt={'Изображение успешного статуса регистрации'}
        titleStatus={'Что-то пошло не так! Попробуйте ещё раз.'}/>
      <ImagePopup 
      card={selectedCard} 
      onClose={closeAllPopups}
      />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <Footer/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
