import React, { useState } from 'react';
import './Login.less'
import Input from '../Input/Input';
import Button from '../Button/Button'
import { createJwt, authorization } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../reducers/userReducer';
import { useNavigate } from 'react-router-dom';


const Login = () => { 
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [wrong, setWrong] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [wrongName, setWrongName] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const userLogin = async () => {
        setError('')
        setWrongName(false);
        setWrongPassword(false);
        setWrong(false);

        const responseCreatingJwt = await createJwt(name, password);

        if (responseCreatingJwt.status === 200){
            const responseAuth = await dispatch(authorization());
            setName('')
            setPassword('')
            if(responseAuth.status !== 200){
                setWrong(true)
                setError('Произошла ошибка')
            }
            else{
                navigate('/')
                dispatch(setUser(responseAuth.data))
            }
        }
        else {
            setWrong(true);
            if (responseCreatingJwt.data.detail === 'No active account found with the given credentials'){
                setError('Неверное имя или пароль')
                setWrongPassword(true);
                setWrongName(true);
                setName('')
                setPassword('')
            }
            else if (responseCreatingJwt.data.password){
                setError('Все поля должны быть заполнены');
                if(name === ''){
                    setWrongName(true);
                }
                if(password === ''){
                    setWrongPassword(true);
                }
            }
        }
    }

    return (
        <div className={['login', wrong? 'wrong' : ''].join(' ')}>
            <div className='error'>{error}</div>
            <Input type="text" placeholder="Введите имя" value={name} setValue={setName} className={wrongName? 'wrongInput' : ''}/>
            <Input type="password" placeholder="Введите пароль" value={password} setValue={setPassword} className={wrongPassword? 'wrongInput' : ''}/>
            <Button className="registration__button button" onClick = {userLogin}>Вход</Button>
        </div>
    );
};

export default Login;