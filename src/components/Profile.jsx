import './Profile.scss';
import { useEffect, useState } from 'react';
import store from '../store';
import { useSelector } from 'react-redux';
import Loader from './Loader.jsx';
import $api from './axios';
import LogoutMenu from './LogoutMenu';
import { useParams } from 'react-router-dom';

function Profile() {
  // /settings/update-avatar (uploadedFile)
  const authedUser = useSelector(state => state.user);
  const [notAuthedUser, setNotAuthedUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);
  const [status, setStatus] = useState("");
  const params = useParams();
  const [changingAvatar, setChangingAvatar] = useState(false);
  const [avatar, setAvatar] = useState();

  useEffect(() => {
      $api.get('https://meetins.herokuapp.com/profile/my-profile')
      .then((response) => {
        store.dispatch({type: 'SET_USER', value: response.data});
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error)
      })

      $api.get('https://meetins.herokuapp.com/profile/by-login/' + params.id)
      .then((response) => {
        setNotAuthedUser(response.data);
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])


  const changeAvatar = () => {
    setStatusChanging(false);
    setChangingAvatar(true);
  }
  const changeStatus = () => {
    setChangingAvatar(false);
    setStatusChanging(true);
    
  }
  const getFileForAvatar = () => {
    console.log(avatar[0]);
    let formData = new FormData();
    formData.append('uploadedFile', avatar[0]);

    $api.post("https://meetins.herokuapp.com/settings/update-avatar", formData)
    .then((response) => {
      authedUser.avatar = response.data.avatar;
      setChangingAvatar(false);
    })
    .catch((error) => {
      console.log(error)
    })
  }
  const saveStatus = () => {
    let object = {
      status: status
    }
    $api.post("https://meetins.herokuapp.com/settings/update-status", object)
    .then((response) => {
      authedUser.status = object.status;
      setStatusChanging(false);
    })
  }
  return (
    <div className="profile">
      <LogoutMenu/>
      {(isLoaded && (params.id == authedUser.login)) ? (
      <div>
        <h1>?????? ??????????????</h1>
        <div className="user_avatar">
          <img alt='' src = {"https://meetins.herokuapp.com/" + authedUser.avatar}/>
          <div className="userName">
            {authedUser.name}
          </div>
        </div>
        <div className="user_info">
          <div className="status">
            <h3>????????????:</h3>
            {" " + authedUser.status}
          </div>
          <div className="change_status">
            <button onClick={() => changeStatus()}>?????????????? ????????????</button>
            <button onClick={() => changeAvatar()}>?????????????? ????????</button>
            {changingAvatar ? (
              <div>
                  <input type = "file" onChange={(e) => setAvatar(e.target.files)}/>
                  <button type = "submit" onClick={() => getFileForAvatar()}>?????????????????? ????????</button>
              </div>
            )
            : (
              <div></div>
            )}
            {statusChanging ? (
            <div className="change_status_block">
              <input onChange={(e) => setStatus(e.target.value)} type="text" placeholder = "?????? ?????????? ????????????"/>
              <button onClick={() => saveStatus()}>?????????????????? ????????????</button>
            </div>
            ) 
            : (
              <br/>
            )}
          </div>
        </div>
      </div>
      )
      : isLoaded ? ((
        <div>
          <h1>??????????????</h1>
          <div className="user_avatar">
          <img alt='' src = {"https://meetins.herokuapp.com/" + notAuthedUser.avatar}/>
          <div className="userName">
            {notAuthedUser.name}
          </div>
        </div>
        <div className="user_info">
          <div className="status">
            <h3>????????????:</h3>
            {" " + notAuthedUser.status}
          </div>
          </div>
        </div>
      )) : (
        <Loader/>
      )}
    </div>
  );
}
export default Profile;