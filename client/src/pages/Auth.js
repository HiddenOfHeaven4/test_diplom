import React, {useCallback, useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import { Container} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import styled from 'styled-components';

const Auth = observer(() => {
    const {user} = useContext(Context);
    const Navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = useCallback( async () => {
        try {
            let data;
            if(isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            Navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message);
        }
    }, [isLogin, email, password]);

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
        >
            <Card>
                <Title>{isLogin ? "Авторизация" : "Регистрация"}</Title>
                <form>
                    <InputContainer>
                        <Label htmlFor='name'>Логин</Label>
                        <Input
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label htmlFor='pass'>Пароль</Label>
                        <Input
                            name='pass'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </InputContainer>
                        <Button
                            onClick={onLogin}
                        >
                            {isLogin ? "Логин" : "Регистрация"}
                        </Button>
                        {isLogin ?
                            <SubText>
                                Нет аккаунта?<NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink>
                            </SubText>
                            :
                            <SubText>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                            </SubText>
                        }

                </form>
            </Card>

        </Container>
    );
});

export default Auth;

const Card = styled.div`
    max-width: 600px;
    width: 100%;
    border: 1px solid #D9D9D9;
    border-radius: 32px;
    padding: 32px;
    margin: 100px 0px;
` 

const Title = styled.h2``

const Input = styled.input`
    display: block;
    outline: none;
    width: 100%;
    border: none;
    font-size: 18px;
    line-height: 24px;
`

const InputContainer = styled.div`
    padding: 8px 18px;
    border: 1px solid #D9D9D9;
    border-radius: 8px;
    margin-top: 32px;

    &:focus{
        border-color: red;
    }
`

const Label = styled.label`
    display: block;
    font-size: 15px;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 5px;
`

const Button = styled.button`
    border: none;
    outline: none;
    background: #F7F8FA;
    border-radius: 12px;
    line-height: 66px;
    color: rgba(0, 0, 0, 0.45);
    font-weight: 500;
    font-size: 18px;
    width: 100%;
    margin-top: 40px;
    display: block;
    transition: .3s;

    &:hover{
        background: #337DFF;
        color: #fff;
    }
`

const SubText = styled.div`
    text-align: center;
    margin-top: 16px;
    font-size: 18px;
    line-height: 24px;

    a{
        text-decoration: none !important;
        margin-left: 5px;
    }
`