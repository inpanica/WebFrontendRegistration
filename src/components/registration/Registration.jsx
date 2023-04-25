import React, { useState } from 'react';
import './Registration.less'
import Input from '../Input/Input';
import Button from '../Button/Button'
import { registration } from '../../actions/user';


const Registration = () => {
    const [email, setEmail] = useState('')
    const [wrongEmail, setWrongEmail] = useState(false)

    const [password, setPassword] = useState('')
    const [wrongPassword, setWrongPassword] = useState(false);

    const [passwordTwo, setPasswordTwo] = useState('')
    const [wrongPasswordTwo, setWrongPasswordTwo] = useState(false)

    const [name, setName] = useState('')
    const [wrongName, setWrongName] = useState(false);

    const [wrong, setWrong] = useState(false)
    const [error, setError] = useState('')

    const userRegistration = async () => {
        setError('')
        setWrongEmail(false)
        setWrong(false);
        setWrongName(false);
        setWrongPassword(false);
        setWrongPasswordTwo(false);
        if (password === passwordTwo){
            const response = await registration(email, name, password);

            if(response.status === 201){ 
                setEmail('');
                setName('');
                setPassword('');
                setPasswordTwo('');
            }

            else{
                setWrong(true);
                if (response.data.username){
                    setWrongName(true);
                    setError('Это имя занято')
                }

                if (response.data.password){
                    setWrongPassword(true);
                    setWrongPasswordTwo(true);
                    setError('Слишком простой пароль')
                }

                if (response.data.password){
                    setWrongEmail(true);
                    setError('Эта почта уже используется')
                }

                if (name === '' || password === '' || passwordTwo === '' || email === ''){
                    setError('Все поля должны быть заполнены')
                }
            }
        }
        else {
            setError('Пароли не совпадают');
            setWrongPassword(true)
            setWrongPasswordTwo(true)
            setWrong(true)
        }
    }

    return (
        <div className={['registration', wrong? 'wrong' : ''].join(' ')}>
            <div className='error'>{error}</div>
            <Input type="text" placeholder="Почта" value={email} setValue={setEmail} className={wrongEmail? 'wrongInput' : ''}/>
            <Input type="text" placeholder="Имя" value={name} setValue={setName} className={wrongName? 'wrongInput' : ''}/>
            <Input type="password" placeholder="Пароль" value={password} setValue={setPassword} className={wrongPassword? 'wrongInput' : ''}/>
            <Input type="password" placeholder="Повторите пароль" value={passwordTwo} setValue={setPasswordTwo} className={wrongPasswordTwo? 'wrongInput' : ''}/>
            <Button className="registration__button button" onClick={userRegistration}>Регистрация</Button>
        </div>
    );
};

export default Registration;