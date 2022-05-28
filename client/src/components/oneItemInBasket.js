import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import styled from 'styled-components';

const OneItemInBasket = ({device}) => {
    const {basket, user} = useContext(Context);

    return (
        <Container key={device.id} style={{width: "100%"}} className="mb-3">
            <Info>
                <DeviceImg src={process.env.REACT_APP_API_URL + device.img} />
                <div>
                    <Name to={`/device/${device.id}`}>{device.name}</Name>
                    <Description>{device.info && device.info.length !== 0? 
                        device.info.map((info, i) => <span>{info.title + ' ' + info.description}</span>) : "Описание отсутствует"}</Description>
                </div>
            </Info>
            <Row>
                <Row>
                    <Decrement onClick={() => basket.setCountDevice(device.id, "-")}>
                        <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H12V2H0V0Z" fill="black" fillOpacity="0.3"/>
                        </svg>
                    </Decrement>
                    <Number type="text" onChange={e =>basket.setCountDevice(Number(e.target.value))} value={device.count}/>
                    <Incriment onClick={() => basket.setCountDevice(device.id, "+")}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 0C6.44772 0 6 0.447715 6 1V6H1C0.447715 6 0 6.44771 0 7C0 7.55228 0.447715 8 1 8H6V13C6 13.5523 6.44772 14 7 14C7.55229 14 8 13.5523 8 13V8H13C13.5523 8 14 7.55228 14 7C14 6.44771 13.5523 6 13 6H8V1C8 0.447715 7.55229 0 7 0Z" fill="black" fillOpacity="0.3"/>
                        </svg>
                    </Incriment>
                </Row>
                <Price>{device.price * device.count} ₽</Price>
                <svg onClick={() => basket.setDeleteItemBasket(device, user.isAuth)} style={{cursor: 'pointer'}} width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_27841_35010)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 3.00196C4 1.3451 5.34315 0.00195312 7 0.00195312H9C10.6569 0.00195312 12 1.3451 12 3.00196H14C14.5523 3.00196 15 3.44967 15 4.00196C15 4.55424 14.5523 5.00196 14 5.00196H13.3462L12.6065 14.617C12.5464 15.3985 11.8948 16.0019 11.111 16.0019H4.88905C4.10524 16.0019 3.45358 15.3985 3.39347 14.617L2.65385 5.00196H2C1.44772 5.00196 1 4.55424 1 4.00196C1 3.44967 1.44772 3.00196 2 3.00196H4ZM11.3402 5.00196H4.65975L5.35206 14.0019H10.6479L11.3402 5.00196ZM7 2.00196C6.44772 2.00196 6 2.44967 6 3.00196H10C10 2.44967 9.55229 2.00196 9 2.00196H7Z" fill="black" fillOpacity="0.3"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_27841_35010">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>

            </Row>
        </Container>
)};

export default OneItemInBasket;

const Container = styled.div`
   display : flex;
   justify-content: space-between;
   align-items: center;
   padding-bottom: 8px;
   border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const Price = styled.div`
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    margin-left: 24px;
    margin-right: 20px;
`

const Info = styled.div`display: flex; align-items: center;`

const Row = styled.div`display: flex; align-items: center;`

const buttonDefault = `
   border: none;
   outline: none;
   background: #F1F2F5;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 13px;
   line-height: 16px;
   width:32px;
   height: 32px;
`

const Incriment = styled.button`
    ${buttonDefault}
    border-radius: 0px 8px 8px 0px;
    margin-left: 1px;
`

const Decrement = styled.button`
    ${buttonDefault}
    border-radius: 8px 0px 0px 8px;
    margin-right: 1px;
`

const Number = styled.input`${buttonDefault} text-align: center;`

const DeviceImg = styled.img`
    display: block;
    width: 120px;
    height: 140px;
    margin-right: 8px;
`

const Name = styled(NavLink)`
    text-decoration: none;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 8px;
    color: #000;
`

const Description = styled.p`
    color: rgba(27, 31, 41, 0.6);
    font-size: 16px;
    line-height: 20px;
`
