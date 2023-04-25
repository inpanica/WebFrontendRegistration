import React, { useState } from 'react';
import './Navbar.less'
import LOGO from '../../img/navbar__logo.svg'
import { NavLink } from 'react-router-dom';
import { logout } from '../../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isAuth)

    return(
        <div className="container">
            <div className='navbar'>
                <NavLink to="/" className='navlink_logo'>
                    <div className='navbar__logo_and_text'>
                        <img src={LOGO} alt='' className='navbar__logo'/>
                        <div className='navbar__header navbar__text'>Cloudy</div>
                    </div>
                </NavLink>
                { !isAuth? <div className="navbar__user">
                    <div className="navbar__registration navbar__text"><NavLink to='/registration'>Регистрация</NavLink></div>
                    <div className="navbar__login navbar__text"><NavLink to="/login">Вход</NavLink></div>
                </div>
                :
                <div className="navbar__user">
                    <div className="navbar__logout navbar__text" onClick={() => dispatch(logout())}>Выйти</div>
                </div>}
            </div>
        </div>
    );
};

export default Navbar;