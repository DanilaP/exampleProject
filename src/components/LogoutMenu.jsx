import './LogoutMenu.scss';
import { useNavigate } from 'react-router-dom';
import {useSelector}from 'react-redux';

function LogoutMenu() {
  const history = useNavigate();
  const selector = useSelector(store => store.user);

  const logout = () => {
    localStorage.removeItem("userToken");
    history("/enter");
  }
  const showOtherPeople = () => {
    history("/peoples");
  }
  const goToProfile  = () => {
    history("/profile/" + selector.login);
    console.log(selector)
  }
  return (
    <div className="LogoutMenu">
        <div>
            <button onClick={() => showOtherPeople()} className='other_people'>Люди</button>
            <button onClick={() => goToProfile()}>Домой</button>
            <button onClick={() => logout()}>Выйти</button>
        </div>
    </div>
  );
}

export default LogoutMenu;