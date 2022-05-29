import React, {useContext, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {Context} from "../index";
import {sendOrder} from "../http/ordersAPI";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";

// Простая логика оформления заказа после его подсчёта и корзине с помощью методов прописанных в API.

const Ordering = () => {
    const {basket, user} = useContext(Context);
    const [phone, setPhone] = useState(null);
    const Navigate = useNavigate();

    const buy = () => {
        let order = {
            mobile: phone,
            basket: basket.Basket
        }

        if(user.isAuth) {
            order.auth = true;
        }

        sendOrder(order).then(data => {
            console.log(data);
            basket.setDeleteAllDeviceFromBasket();
            Navigate(SHOP_ROUTE);
        });
    }
    return (
        <>
            <Form>
                <Form.Control
                    placeholder="Введите Ваш номер телефона"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="mt-3"
                />
            </Form>
            <Row className="mt-3">
                <Col xs={12}>
                    <Button variant="secondary" onClick={buy}>Купить</Button>
                </Col>
            </Row>
        </>
    );
};

export default Ordering;
