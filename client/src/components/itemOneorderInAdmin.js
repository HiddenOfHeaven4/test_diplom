import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import styled from 'styled-components';
import {fetchChangeStatusOrder, fetchDeleteOrder} from "../http/ordersAPI";
import {ORDERS_ROUTE} from "../utils/consts";



const ItemOneOrderInAdmin = ({id, complete, mobile, createdAt, updatedAt, userId, reRender}) => {
    const [modalDelete, setShowDelete] = useState(false);
    const [modalStatus, setShowStatus] = useState(false);

    //modal delete
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const deleteOrder = () => {
        fetchDeleteOrder({id}).then(() => {
            setShowStatus(false);
            setTimeout(() => reRender(), 250);
        })
    }

    //modal status
    const handleCloseStatus = () => setShowStatus(false);
    const handleShowStatus = () => setShowStatus(true);
    const changeStatusOrder = () => {
        fetchChangeStatusOrder({complete: !complete, id}).then(() => {
            setShowStatus(false);
            setTimeout(() => reRender(), 250);
        })
    }

    //Format date (createdAt)
    const formatDate = (propsDate) => {
        const date = new Date(Date.parse(propsDate));
        const options = {
            weekday: "short",
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        return date.toLocaleString("en-US", options);
    }

    return (
        <>
            <Item>
                <OrderNumber to={ORDERS_ROUTE}>Заказ №{id}</OrderNumber>
                <Status>{complete ? "Готово" : "В процессе"}</Status>
                <InfoItem>
                    <div style={{marginRight: 12}}>
                        <InfoTitle>Телефон</InfoTitle>
                        <InfoTitle>Создан</InfoTitle>
                        <InfoTitle>{complete && "Готов"}</InfoTitle>
                    </div>
                    <div>
                        <InfoValue><a href={`tel:${mobile}`}>{mobile}</a></InfoValue>
                        <InfoValue>{formatDate(createdAt)}</InfoValue>
                        <InfoValue>{complete && formatDate(updatedAt)}</InfoValue>
                    </div>
                </InfoItem>
                <InfoItem>
                    <Button onClick={handleShowStatus}>{complete ? 'Сделать не полным' : 'Сделать полным'}</Button>
                    <Button className='red' onClick={handleShowDelete}>Удалить</Button>
                </InfoItem>
            </Item>


            <Modal className={modalStatus && 'active'} onClick={handleCloseStatus}>
                <ModalBody onClick={(e) => e.stopPropagation()}>
                <svg style={{position: 'absolute', top: 22, right: 22, cursor: 'pointer'}} onClick={handleCloseStatus} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.4083 7.24162C22.8639 6.78601 22.8639 6.04732 22.4083 5.59171C21.9527 5.1361 21.214 5.1361 20.7584 5.59171L14 12.3501L7.24162 5.59171C6.78601 5.1361 6.04732 5.1361 5.59171 5.59171C5.1361 6.04732 5.1361 6.78601 5.59171 7.24162L12.3501 14L5.59171 20.7584C5.1361 21.214 5.1361 21.9527 5.59171 22.4083C6.04732 22.8639 6.78601 22.8639 7.24162 22.4083L14 15.6499L20.7584 22.4083C21.214 22.8639 21.9527 22.8639 22.4083 22.4083C22.8639 21.9527 22.8639 21.214 22.4083 20.7584L15.6499 14L22.4083 7.24162Z" fill="#BEC1C8"/>
                </svg>

                    <ModalTitle>Пожалуйста подтвердите</ModalTitle>
                    Вы можете изменить статус(id: {id}), from {complete ? '\'Готово\'' : '\'В процессе\''} to {complete ? '\'В процессе\'' : '\'Готово\''}?
                    <br/><br/>
                    Дата:
                    <ul>
                        <li>Сотовый: {mobile}</li>
                        <li>CreatedAt: {formatDate(createdAt)}</li>
                        {complete ? `Все готово: ${formatDate(updatedAt)}` : false}
                        <li>Статус: {complete ? 'Готово' : `В процессе`}</li>
                        <li>{userId ? 'Покупатель: Зарегистрирован' : `Покупатель: Не зарегистрирован`}</li>
                    </ul>
                    <ButtonContainer>
                    <ButtonType className='gray' onClick={handleCloseStatus}>
                        Отменить
                    </ButtonType>
                    <ButtonType onClick={changeStatusOrder}>
                        Подтвердить
                    </ButtonType>
                    </ButtonContainer>
                </ModalBody>
            </Modal>
            <Modal className={modalDelete && 'active'} onClick={handleCloseDelete}>
                <ModalBody onClick={(e) => e.stopPropagation()}>
                <svg style={{position: 'absolute', top: 22, right: 22, cursor: 'pointer'}} onClick={handleCloseDelete} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.4083 7.24162C22.8639 6.78601 22.8639 6.04732 22.4083 5.59171C21.9527 5.1361 21.214 5.1361 20.7584 5.59171L14 12.3501L7.24162 5.59171C6.78601 5.1361 6.04732 5.1361 5.59171 5.59171C5.1361 6.04732 5.1361 6.78601 5.59171 7.24162L12.3501 14L5.59171 20.7584C5.1361 21.214 5.1361 21.9527 5.59171 22.4083C6.04732 22.8639 6.78601 22.8639 7.24162 22.4083L14 15.6499L20.7584 22.4083C21.214 22.8639 21.9527 22.8639 22.4083 22.4083C22.8639 21.9527 22.8639 21.214 22.4083 20.7584L15.6499 14L22.4083 7.24162Z" fill="#BEC1C8"/>
                </svg>
                    <ModalTitle>Пожалуйста подтвердите</ModalTitle>

                    Вы можете Удалить(id: {id})?
                    <br/><br/>
                    Дата:
                    <ul>
                        <li>Сотовый: {mobile}</li>
                        <li>CreatedAt: {formatDate(createdAt)}</li>
                        {complete ? `Все готово: ${formatDate(updatedAt)}` : false}
                        <li>Статус: {complete ? 'Готово' : `В процессе`}</li>
                        <li>{userId ? 'Покупатель: Зарегистрирован' : `Покупатель: Не зарегистрирован`}</li>
                    </ul>
                <ButtonContainer>
                    <ButtonType className='gray' onClick={handleCloseDelete}>
                        Отменить
                    </ButtonType>
                    <ButtonType  onClick={deleteOrder}>
                        Подтвердить
                    </ButtonType>
                </ButtonContainer>
                </ModalBody>
            </Modal> 
        </>
    )
};

export default ItemOneOrderInAdmin;

const Item = styled.div`
    padding: 24px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`
const Status = styled.div`
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 24px;
`

const InfoTitle = styled.div`
    font-size: 18px;
    line-height: 24px;
    color: rgba(27, 31, 41, 0.6);
    margin-bottom: 12px;
`
const Button = styled.button`
    border: 2px solid #337DFF;
    background: transparent;
    border-radius: 12px;
    width: 200px;
    line-height: 48px;
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    margin-right: 12px;
    color: #337DFF;

    &.red{
        color: #dc3545;
        border-color: #dc3545;
    }
`

const InfoValue = styled.div`
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 12px;
`

const InfoItem = styled.div`
    display: flex;
    align-items: center;
`

const OrderNumber = styled(NavLink)`
    font-size: 16px;
    line-height: 20px;
    color: rgba(27, 31, 41, 0.6);
    text-deсoration: none !important;
    margin-bottom: 8px;
`

const Modal = styled.div`
    position: fixed;
    background: rgba(0, 0, 0, 0.24);
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    transition: all .3s;
    visibility: hidden;
    opacity : 0;
    z-index: 100;

    &.active{
        visibility: visible;
        opacity: 1;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 16px;
`

const ButtonType = styled.button`
    border: none;
    outline: none;
    background: #0057EE;
    flex: 1;
    line-height: 66px;
    border-radius: 12px;
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    color: #fff;
    transition: opacity .3s;

    &:hover{
        opacity: 0.8;
    }

    &.gray{
        background: #F1F2F5;
        color: #000;
    }
`

const ModalBody = styled.div`
    padding: 32px;
    margin: 64px auto;
    background: #fff;
    border-radius: 32px;
    max-width: 600px;
    position: relative;
`

const ModalTitle = styled.div`
    font-weight: 500;
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 40px;
`