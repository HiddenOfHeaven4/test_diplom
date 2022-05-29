import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {addDeviceToBasket, addRating, checkRating, fetchOneDevice} from "../http/deviceAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import star from '../assets/star.png';
import styled from 'styled-components';
import RatingStars from '../components/ratingStars'

// Логика страницы товара с использоваем MobX, useState.
// useParams для параметра поиска

const DevicePage = observer(() => {
    const {user, basket} = useContext(Context);
    const [device, setDevice] = useState({info: []});
    const [resRate, setResRate] = useState("");
    const [isAccessRating, setSsAccessRating] = useState(false);
    const {id} = useParams();


    useEffect( () => {
        fetchOneDevice(id).then(data => setDevice(data));
        if(user.isAuth) {
            checkRating({deviceId: id}).then(res => setSsAccessRating(res.allow));
        }
    },[id, resRate]);

    const isDeviceInBasket = () => {
        const findDevice = basket.Basket.findIndex(item => Number(item.id) === Number(device.id));
        return findDevice < 0;
    }

    const addDeviceInBasket = (device) => {
        if(user.isAuth) {
            addDeviceToBasket(device).then(() => basket.setBasket(device, true))
        } else {
            basket.setBasket(device);
        }
    }


    const ratingChanged = (rate) => {
        addRating({
            rate,
            deviceId: id
        }).then(res => {
            setResRate(res);
        });
    };

    return (
        <>
                         
            <Title>{device.name}</Title>
            <Row>
                <Image>
                    <img src={process.env.REACT_APP_API_URL + device.img}/>
                </Image>
                <Content>
                    <Price>{device?.price || 0} ₽</Price>
                    <BtnRow style={{padding: 0, justifyContent: 'flex-start', marginBottom: 40}}>
                    { isDeviceInBasket() ? 
                        <Btn style={{maxWidth: 250}} onClick={() => addDeviceInBasket(device)} >В корзину</Btn>
                    :
                        <Btn style={{maxWidth: 250}} disabled>Товар уже есть в магазине</Btn>
                    }
                    </BtnRow>
                    {device.info.length > 0 && <h3>Основные характеристики</h3>}
                    {device.info.map( (info) =>
                        <Info key={info.id}>
                            <InfoName>{info.title}</InfoName><InfoValue>{info.description}</InfoValue>
                        </Info>
                    )}
                    <RateRow>
                        <Rate>
                            {device?.rating || 0}
                        </Rate>
                        <RatingStars
                            ratingChanged={ratingChanged}
                            ratingVal={device?.rating || 0}
                            isAuth={user.isAuth}
                            isAccessRating={isAccessRating}
                        />
                        </RateRow>
                </Content>
            </Row>
        </>
    );
});

export default DevicePage;


const Row = styled.div`
    display: flex;
    margin: 32px 0px;
    justify-content: space-between;
    flex: 12;

    &.rate{
        flex: 1;
        margin: 24px 0px 0px;
    }
`

const Rate = styled.div`
    font-size: 32px;
    font-weight: 700;
    margin-right: 12px;
`

const RateRow = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.h2`
        font-weight: 500;
        font-size: 34px;
        line-height: 40px;
        margin-top: 32px;
`
const Image = styled.div`
    max-width: 100%;
    width: 100%;
    margin-right: 64px;
    flex: 6;

    img{
        max-width: 100%;
        width: 100%;
    }
`
const Content = styled.div`
    width: 497px;
    flex: 5;
`

const BtnRow = styled.div`
    display: flex;
    margin-bottom: 40px;
`

const Btn = styled.button`
    background: #337DFF;
    border-radius: 16px;
    line-height: 56px;
    margin-right: 8px;
    font-weight: 500;
    border: none;
    outline: none;
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

    &:disabled{
        background: #F7F8FA;
        color: rgba(0, 0, 0, 0.45);
    }
`

const BtnImg = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    border: none;
    outline: none;
    background: none;
`

const Info = styled.div`
    display flex;
    aligin-items: center;
    justify-content: space-between;
    padding: 16px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child{
        border-bottom: none;
    }
`

const InfoName = styled.span`
    color: rgba(27, 31, 41, 0.6);
    font-size: 18px;
    line-height: 24px;
`
const InfoValue = styled.span`
    font-size: 18px;
    line-height: 24px;
`

const Price = styled.div`
    font-weight: 500;
    font-size: 34px;
    line-height: 40px;
    margin-bottom: 24px;
`

/**
 * @param {{rating}} rating of device
 * @param {{price}} price of device
 */
