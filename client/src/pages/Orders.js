import React, {useEffect, useState} from 'react';
import {Dropdown, Pagination, Spinner, Col} from "react-bootstrap";
import {fetchOrders} from "../http/ordersAPI";
import ItemOneOrderInAdmin from "../components/itemOneorderInAdmin";
import styled from 'styled-components';

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState("All");
    const [rerender, setRerender] = useState(false);

    const limit = 5;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];

    useEffect(() => {
        fetchOrders({limit, page: 1}).then(data => {
            setOrders(data);
            setLoading(false);
            setCount(data.count);
        })
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchOrders({limit, page: currentPage}).then(data => {
            setOrders(data);
            setLoading(false);
        })
    }, [currentPage]);

    useEffect(() => {
        setLoading(true);
        fetchOrders({limit, page: 1, complete: filter}).then(data => {
            setOrders(data);
            setLoading(false);
            setCount(data.count);
            setCurrentPage(1);
        })
    }, [filter]);

    useEffect(() => {
        setLoading(true);
        fetchOrders({limit, page: currentPage, complete: filter}).then(data => {
            setOrders(data);
            setLoading(false);
            setCount(data.count);
            setCurrentPage(1);
        })
    }, [rerender]);

    const reRender = () => {
        setRerender(!rerender);
    }

    if(loading) {
        return <Spinner animation="grow"/>
    }

    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container>
            <Title>Мои заказы</Title>
                <Inner>
                    <Col xs={3} className='pl-0'>
                        <FilterItem className={filter === "All"  && 'active'} onClick={() => setFilter("All")}>Все</FilterItem>
                        <FilterItem className={filter === "Complete"  && 'active'} onClick={() => setFilter("Complete")}>Готовые</FilterItem>
                        <FilterItem className={filter === "Uncomplete"  && 'active'} onClick={() => setFilter("Uncomplete")}>Не готовые</FilterItem>
                    </Col>
                    <Col xs={9} className='pr-0'>
                    {orders.rows?.map( ({id, complete, mobile, createdAt, updatedAt, userId}) =>
                    <ItemOneOrderInAdmin
                        key={id}
                        id={id}
                        complete={complete}
                        mobile={mobile}
                        createdAt={createdAt}
                        updatedAt={updatedAt}
                        userId={userId}
                        reRender={reRender}/>)}
                    </Col>
                </Inner>
            <Pagination size="sm" className="mt-4 mb-4" style={{margin: "0 auto"}}>
                {pages}
            </Pagination>
        </Container>
    );
};

export default Orders;

const Container = styled.div`
    max-width: 1280px;
    width: 100%;
    padding: 32px;
`

const Title = styled.h2`
    font-weight: 500;
    font-size: 34px;
    line-height: 40px;
    margin-bottom: 54px;
`

const Inner = styled.div`
    display: flex;
`

const FilterItem = styled.div`
    font-size: 18px;
    line-height: 24px;
    padding: 14px;
    cursor: pointer;

    &.active{
        background: #F7F8FA;
        border-radius: 16px;
    }
`