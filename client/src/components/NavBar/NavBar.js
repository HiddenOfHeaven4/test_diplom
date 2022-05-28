import React from 'react';
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

import { SHOP_ROUTE } from "../../utils/consts";
import Auth from "./preesent-components/Auth";
import SearchSvg from '../../assets/svg/search.svg'
import styled from 'styled-components'

export default observer(() => {
    return (
        <Nav>
            <Container>
                <Logo to = { SHOP_ROUTE } >Petroff</Logo> 
                <div style={{position: 'relative', flex: 1, display: 'flex'}}>
                    <Search 
                    type='text' 
                    placeholder='Искать товары' 
                    />
                    <SearchIcon src={SearchSvg}/>
                </div>
                < Auth />
            </Container>
        </Nav>
    );
});

const Nav = styled.div`
    background-color: #F7F8FA;
`;

const Search = styled.input`
    flex: 1;
    margin: 0 24px;
    border: 1px solid #D9D9D9;
    border-radius: 12px;
    background: #fff;
    padding: 12px 24px;
    padding-right: 48px;
    outline: none;
`

const SearchIcon = styled.img`
    position: absolute;
    top: 14px;
    right: 42px;
`

const Logo = styled(NavLink)`
    font-weight: 700;
    font-size: 28px;
    line-height: 36px;
    text-decoration: none !important;
    color: #000;
`

const Container = styled.div`
    display: flex;
    max-width: 1280px;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    padding: 24px 32px;
`
