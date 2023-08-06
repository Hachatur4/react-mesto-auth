import { Link } from 'react-router-dom';
import logoHeader from '../images/logo-header.svg'

function Header (props) {

  function signOut(){
    props.linkTitle === 'Выйти' && localStorage.removeItem('jwt')
  }

  return (
    <header className="header">
      <div className='header__container'>
        <img
          className="header__logo"
          src={logoHeader}
          alt="Логотип"
        />
        <div>
          {props.loggedIn && <span className='header__title'>{props.userEmail}</span>}
          <Link to={`/${props.link}`} onClick={()=>{signOut()}} className="header__title">{props.linkTitle}</Link>
        </div>
      </div>
    </header>
  )
}

export default Header;