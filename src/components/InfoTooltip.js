import React from 'react';
import logo from '../images/popup/popup-status-ok.svg'

function InfoTooltip(props) {

  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`} 
      onClick={()=>{props.onClose()}}>
      <div className="popup__container-status" onClick={e=> e.stopPropagation()}>
        <img
            className="popup__status-image"
            src={props.img}
            alt={props.imgAlt}
          />
        <h3 className="popup__title-status">{props.titleStatus}</h3>
        <button type="button" className="popup__close-icon" onClick={()=>{props.onClose()}}></button>
      </div>
    </div>
  );
} 

export default InfoTooltip