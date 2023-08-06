import React from 'react';

function ImagePopup(props) {
  return (
    <div className= {`popup popup-image ${Object.entries(props.card).length >= 1 ? 'popup_opened' : ''}`} onClick={()=>{props.onClose()}}>
      <div className="popup__container-image" onClick={e=> e.stopPropagation()}>
        <img
          className="popup__element-image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__title-image">{props.card.name}</p>
        <button type="button" className="popup__close-icon" onClick={()=>{props.onClose()}}></button>
      </div>
    </div>
  );
} 

export default ImagePopup