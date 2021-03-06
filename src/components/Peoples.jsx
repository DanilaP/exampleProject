import { useEffect, useState } from 'react';
import './Peoples.scss';
import $api from "./axios";
import store from '../store';
import { useSelector } from 'react-redux';
import LogoutMenu from './LogoutMenu';
import { useNavigate } from 'react-router-dom';


function Peoples() {
  const selector = useSelector(state => state.allUsers);
  const user = useSelector(state => state.user);
  const history = useNavigate();
  const [partOfUsers, setPartOfUsers] = useState([]);

  const goToUserProfile = (el) => {
    console.log(el)
    store.dispatch({type: 'NOT_AUTHED_USER', value: el});
    history("/profile/" + el.login)
  }
  const sortUsersByGender = (value) => {
      $api.get('https://meetins.herokuapp.com/users/getUserList')
      .then((response) => {
        setPartOfUsers(response.data);
        if (value == ("М")) {
          setPartOfUsers(response.data.filter(el => (el.gender == "М") || (el.gender =="male"))); 
        }
        else if (value == ("Ж")) {
          setPartOfUsers(response.data.filter(el => (el.gender == "Ж") || (el.gender =="female"))); 
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }


  useEffect(() => {
    $api.get('https://meetins.herokuapp.com/users/getUserList')
    .then((response) => {
        store.dispatch({type: 'ALL_USERS', value: response.data});
        store.dispatch({type: 'SET_USER', value: user});
        setPartOfUsers(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
  }, [])

  useEffect(() => {
    const scrollHandler = (event) => {
        if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight)<100) {
            if (partOfUsers.length !== selector.length) {
              setPartOfUsers((partOfUsers) => selector.slice(0, partOfUsers.length+5));
            }
        }
    }
        document.addEventListener('scroll', scrollHandler);
    return () => {
        document.removeEventListener('scroll', scrollHandler);
    }
  }, [selector])

  useEffect(() => {
    //console.log(partOfUsers)
  }, [partOfUsers])

  return (
    <div className="Peoples">
    <LogoutMenu/>
    <div className="sort_menu">
    <select onChange={(e) => sortUsersByGender(e.target.value)}>
      <option value={"ALL"}>Все люди</option>
      <option value={"М"}>Мужской пол</option>
      <option value={"Ж"}>Женский пол</option>
    </select>
    </div>
    <div className='all_users'>
      {partOfUsers.map((el) => 
        <div onClick={() => goToUserProfile(el)} className='user'>
            <img src = {"https://meetins.herokuapp.com/" + el.userAvatar}/>
            <br />
            {el.userName}
        </div>
      )}
    </div>
    </div>
  );
}

export default Peoples;
