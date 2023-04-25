import React, { useState } from 'react';
import Button from './Button/Button';
import { NavLink } from 'react-router-dom';
import './App.less'
const Main = () => {

    return(
        <div className="main_content">
            <h1 className="logo_h1">
                cloudy
            </h1>
            <div className="main_text">
                <h2 className="title">
                    Простой и безопасный облачный доступ к файлам
                </h2>
                <p className="description">
                    Вы можете бесплатно хранить и файлы и скачивать их с любого устройства из любой точки мира.
                </p>
            </div>
            <div className="main_buttons">
                <NavLink to='/registration' className='navlink'><Button className="registration__button button">Регистрация</Button></NavLink>
                <NavLink to='/login' className='navlink'><Button className="registration__button button">Вход</Button></NavLink>
            </div>
            <hr/>
        </div>
    );
};

export default Main;