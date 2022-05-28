import React, {useContext} from "react";
import {Context} from "../../../index";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, ORDERS_ROUTE} from "../../../utils/consts";
import ProfileSvg from '../../../assets/svg/profile.svg';
import ShopSvg from '../../../assets/svg/shop.svg'
import RateSvg from '../../../assets/svg/rate.svg'
import LogoutSvg from '../../../assets/svg/logout.svg'
import styled from "styled-components";

const Auth = () => {
    const {user, basket} = useContext(Context);
    const Navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        basket.resetBasket();
    }

    return (
        <Container>
            <Icon src={ProfileSvg} onClick={() => {Navigate(user.isAuth ? ADMIN_ROUTE : LOGIN_ROUTE)}}/>
            {user.isAuth && user.User.role === "ADMIN" && 
                <Icon src={RateSvg} onClick={() => {Navigate(ORDERS_ROUTE)}}/>
            }
            <Icon src={ShopSvg} onClick={() => {Navigate(BASKET_ROUTE)}}/>
            {user.isAuth && <Icon src={LogoutSvg} onClick={logOut}/>}
        </Container>
    );
};

export default Auth;

const Icon = styled.img`
    cursor: pointer;
    border-radius: 6px;
    transition: background .3s;

    &:hover{
        background: #fff;
    }
`

const Container = styled.div`
    display: flex;
    column-gap: 16px;
`
