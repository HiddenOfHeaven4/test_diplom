import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";


import {Context} from "../index";
import {Button, Col, Row} from "react-bootstrap";
import OneItemInBasket from "../components/oneItemInBasket";

import {ORDERING_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";
import styled from 'styled-components';

//  Страница пустой корзины с состоянием через MobX

const BasketCard = observer(() => {
    const {basket} = useContext(Context);

    if(basket.Basket.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center mt-5">
                <div className="text-center mt-5" style={{fontSize: 28}}><b>Ой! Кажется, тут пусто</b></div>
            </div>
        )
    }

    return (
        <>
            <br/>
            <h2>Корзина</h2>
            <Row className="mt-5 mb-5">
                <Col xs={8}>
                    {basket.Basket.map(device => <OneItemInBasket key={device.id} device={device}/>)}
                </Col>
                <Col xs={4}>
                    <Title>В корзине</Title>
                    <Info>
                        <InfoDesc>{`${basket.Basket.length} товара`}</InfoDesc>
                        <Price>{basket.Price} ₽</Price>
                    </Info>
                    <MakeOrder to={ORDERING_ROUTE}>Перейти к оформлению</MakeOrder>
                </Col>
            </Row>
        </>
    );
});

export default BasketCard;


const Title = styled.h3`
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 24px;
`

const Info = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
`

const InfoDesc = styled.p`
    font-size: 16px;
    line-height: 20px;
`

const Price = styled.p`
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
`
const MakeOrder = styled(NavLink)`
    text-decoration: none !important;
    background: #337DFF;
    border-radius: 12px;
    display: block;
    line-height: 48px;
    font-weight: 500;
    font-size: 18px;
    color: #fff;
    transition: opacity .3s;
    text-align: center;

    &:hover{
        opacity: .8;
        color: #fff !important;
    }
`
