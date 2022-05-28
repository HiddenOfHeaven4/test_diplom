import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SHOP_ROUTE } from '../utils/consts'

export default observer(() => {
    return (
        <Container>
            <Inner>
                <Logo to={SHOP_ROUTE}>Petroff</Logo>
                <Row>
                    <div>
                        <Title>Конакты</Title>
                        <Item>Адрес: Самара, Московское шоссе 32б</Item>
                        <Item>Телефон: +7 876 654 43 12</Item>
                        <Item>График работы: Пн-Пт: с 8:00 до 18:00</Item>
                    </div>
                    <div>
                        <Title>Наши предложения</Title>
                        <LinkItem to={SHOP_ROUTE}>Новинки</LinkItem>
                        <LinkItem to={SHOP_ROUTE}>Популярные товары</LinkItem>
                        <LinkItem to={SHOP_ROUTE}>Рекомендуемые товары</LinkItem>
                    </div>
                    <div>
                        <Title>Помощь и сервисы</Title>
                        <LinkItem to={SHOP_ROUTE}>О компании</LinkItem>
                        <LinkItem to={SHOP_ROUTE}>Каталог</LinkItem>
                        <LinkItem to={SHOP_ROUTE}>Доставка</LinkItem>
                    </div>
                </Row>
                <Row>
                    <div>
                        <Item>© Сеть Petroff, 2007-2022<br/>Все права защищены</Item>
                    </div>
                    <div>
                        <Item style={{maxWidth: 400}}>Указанные в интернет-магазине цены товаров и условия их преобретения действительны на текущую дату</Item>
                    </div>
                </Row>
            </Inner>
        </Container>
    )
})

const Container = styled.div`
background: #F7F8FA;
`
const Inner = styled.div`
    max-width: 1280px;
    width: 100%;
    padding: 32px;
    margin: 0 auto;
`

const Title = styled.h3`
    margin: 0;
    margin-bottom: 16px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: rgba(27, 31, 41, 0.6);
`

const Logo = styled(Link)`
    text-deoration: none;
    display: block;
    color: rgba(27, 31, 41, 0.6);
    margin-bottom: 32px;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    &:hover{
        text-decoration: none;
    }
`

const Row = styled.div`
    display: flex;
    column-gap: 64px;

    &:last-child{
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        padding-top: 16px;
    }
`

const itemStyles = `
    text-decoration: none;
    font-size: 15px;
    display: block;
    line-height: 18px;
    color: rgba(27, 31, 41, 0.6);
    margin-top: 8px;
`

const Item = styled.p`${itemStyles}`

const LinkItem = styled(Link)`
${itemStyles}
&:hover{
    text-decoration: none;
}
`