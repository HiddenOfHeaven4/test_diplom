import React from 'react';

import star from '../assets/star.png';
import {Link, useNavigate} from 'react-router-dom';
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE} from "../utils/consts";
import styled from 'styled-components';

export default ({device}) => {
    const Navigate = useNavigate();
    return (
        <Container onClick={() => Navigate(DEVICE_ROUTE + '/' + device.id)}>

                <MainImg src={process.env.REACT_APP_API_URL + device.img}/>
                <InfoContainer>
                    <Price>{device.price} ₽</Price>
                    <Text>{`${device && device.brand.name} ${device.name}`}</Text>
                </InfoContainer>
                <BtnRow>
                    <Btn to={BASKET_ROUTE}>В корзину</Btn>
                    <BtnImg to={ADMIN_ROUTE}>
                        <img src={star} style={{width: 20, height: 20}}/>
                    </BtnImg>
                </BtnRow>
        </Container>
    );
};


const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #F7F8FA;
    border-radius: 32px;
    padding: 8px;
`
const MainImg = styled.img`
    display: block;
    max-width: 100%;
    max-height: 226px;
    height: 100%;
    border-radius: 24px;
    margin-bottom: 16px;
    background: #fff;
`

const Text = styled.div`
    font-size: 16px;
    line-height: 20px;
`
const InfoContainer = styled.div`
    padding: 16px;
`

const Price = styled.div`
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 8px;
    line-height: 30px;
`
const BtnRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding: 8px;
`

const Btn = styled(Link)`
    background: #337DFF;
    border-radius: 16px;
    line-height: 56px;
    margin-right: 8px;
    font-weight: 500;
    font-size: 18px;
    color: #fff;
    flex: 10;
    text-align: center;
    transition: opacity .3s;

    &:hover{
        text-decoration: none;
        color: #fff;
        opacity: .8;
    }
`

const BtnImg = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 2;
`