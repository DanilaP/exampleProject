import React, { useState } from "react";
import MainMenu from "./mainMenu";
import "./EnterToSite.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import $api from "./axios";
import store from "../store";

function EnterToSite() {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  let history = useNavigate();
  store.dispatch({type: 'CHANGE_ROUTER', value: history});

  const enter = () => {
    const userData = {
      email: userEmail,
      password: userPassword,
    }
    if (userData.email && userData.password !== ''){
      $api.post('https://meetins.herokuapp.com/auth/login', userData)
      .then((response) => {
          if (response.status === 200) {
            store.dispatch({type: 'SET_USER', value: response.data.profile.user});
            history('/profile/' + response.data.profile.user.login);
            localStorage.setItem('userToken', response.data.auth.token);
          }
          else {
            return;
          }
      })
      .catch((error) => {
          console.log(error);
      })
    }
    else {
      return
    }
  }


  return (
    <div className="enter">
      <MainMenu/>
      <form onSubmit={handleSubmit((data) => {
      })}>
        <div className="enter_menu">
          <div className="enter_data">
            <input
            {...register("name", {required: 'Это обязательное поле'})} 
            type = "text" 
            placeholder="Email" 
            onChange={(e) => setUserEmail(e.target.value)}/>
             <span>{errors.name?.message}</span>
            <input 
            {...register("email", {required: 'Это обязательное поле'})} 
            type = "password" 
            placeholder="пароль"
            onChange={(e) => setUserPassword(e.target.value)}/>
             <span>{errors.email?.message}</span>
          </div>
          <div className="enter_buttons">
            <button type = "submit" onClick={() => enter()}>Войти</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EnterToSite;
