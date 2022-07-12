import React, { useState } from "react";
import './startPage.scss';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import $api from "../components/axios";
import store from "../store";

function StartPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userTown, setUserTown] = useState('');
    const [userGender, setGender] = useState('');
    let history = useNavigate();
    
    const startRegistration = async () => {
        let user = {
            name: name, 
            email: userEmail,
            password: userPassword,
            gender: userGender, 
            city: userTown,
        }
        let rule = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        let validemail = rule.test(user.email);

        if ((user.name && user.email && user.password && user.gender && user.city) !== '' && validemail === true && user.name.length >=2){
            await $api.post('https://meetins.herokuapp.com/auth/registration', user)
            .then((response) => {
                store.dispatch({type: 'SET_USER', value: response.data.profile.user});
                localStorage.setItem('userToken', response.data.auth.token);
                history('/profile/' + response.data.profile.user.login);
            })
            .catch((error) => {
                console.log(error);
            })
        } else {
            return
        }
    }
    const changeGender = (gender) => {
        setGender(gender);
    } 
  return (
  <div className="startPage">
    <form onSubmit={handleSubmit((data) => {
        console.log(data);
    })}>
        <div className="registration_menu">
            <div className="registration_data">
                <input 
                  {...register("name", {required: 'Это обязательное поле', minLength: {
                    value: 2, 
                    message: 'Минимальная длина 2 символа'
                  }})}
                   onChange={(e) => setName(e.target.value)}
                   placeholder="Имя" 
                   type = "text"/>
                   <span>{errors.name?.message}</span>
                <input 
                   {...register("email", {required: 'Это обязательное поле'})}
                   onChange={(e) => setUserEmail(e.target.value)}
                   placeholder="Email" 
                   type = "text"/>
                   <span>{errors.email?.message}</span>
                <input 
                   {...register("password", {required: 'Это обязательное поле', minLength: {
                    value: 6,
                    message: 'Минимальная длина 6 символов'
                   }})}
                   onChange={(e) => setUserPassword(e.target.value)}
                   placeholder="Пароль" 
                   type = "password"/>
                   <span>{errors.password?.message}</span>
                <input 
                   {...register("city", {required: 'Это обязательное поле'})}
                   onChange={(e) => setUserTown(e.target.value)}
                   placeholder="Город" 
                   type = "text"/>
                   <span>{errors.city?.message}</span>
                <input 
                   {...register("gender", {required: ''})}
                   onChange={(e) => setGender(e.target.value)}
                   value = {userGender}
                   placeholder="Пол"
                   type="text" disabled/>
                   <span>{errors.gender?.message}</span>
                <div className="gender_buttons">
                   <button className="gender_button" type = "button" onClick={() => changeGender("М")}>М</button>
                   <button className="gender_button" type = "button" onClick={() => changeGender("Ж")}>Ж</button>
                </div>
                </div>
                <div className="register_buttons">
                    <button className="sub_button" type = "submit" onClick={() => startRegistration()}>Регистрация</button>
                </div>
        </div>
      </form>
    </div>
  );
}

export default StartPage;