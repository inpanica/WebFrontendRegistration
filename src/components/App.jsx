import './App.less';
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './navbar/Navbar';
import Registration from './registration/Registration';
import Main from './Main.jsx'
import Login from './authorisation/Login';
import { authorization, refreshJwt} from '../actions/user';
import { setUser } from '../reducers/userReducer';

const App = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    const autoAuth = async () => {
        if(localStorage.getItem('access')){
            const responseAuth = await dispatch(authorization());
            if (responseAuth.status === 200){
                dispatch(setUser(responseAuth.data))
            }
            else if (responseAuth.status === 401){
                const refresh = await refreshJwt();
                const responseAuthTwo = await dispatch(authorization());
                if(responseAuthTwo.status === 200){
                    dispatch(setUser(responseAuthTwo.data));
                }
                else {
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                }
            }
            else {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
            }
        }
    }

    useEffect(() =>{
        autoAuth();
    }, [])

    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar/>
                <div className="wrap">
                    {!isAuth ?
                        <Routes>
                            <Route path="/" Component={Main}/>
                            <Route path="/registration" Component={Registration}/>
                            <Route path="/login" Component={Login}/>
                        </Routes>
                        :
                        <Routes>
                            <Route exact path="/" Component={Main}/>
                        </Routes>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;