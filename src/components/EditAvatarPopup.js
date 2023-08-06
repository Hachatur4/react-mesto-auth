import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function EditAvatarPopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = React.useState('');
  const avatarRef = React.useRef();

  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]); 

  function handleChange() {
    setAvatar(avatarRef.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatar,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [props.isOpen]); 
  
  return (
      <PopupWithForm 
      name='changeAvatar' 
      title='Обновить аватар' 
      buttonTitle='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
          <label className="form__field">
            <input
              type="url"
              name="avatarLink"
              id="avatar-input"
              className="form__input form-avatar__input"
              placeholder="Ссылка на изображение"
              required
              ref={avatarRef}
              onChange={handleChange}
            />
            <span className="form__input-error avatar-input-error"></span>
          </label>
      </PopupWithForm>
  );
} 

export default EditAvatarPopup