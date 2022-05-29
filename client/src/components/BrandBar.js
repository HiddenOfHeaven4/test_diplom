import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import styled from 'styled-components';

// Логика создания бренда с применением state manager (MobX)

const BrandBar = observer(()  => {
    const {device} = useContext(Context);
    return (
        <Row>
            {device.brands.map(brand =>
                <Card
                    style={{fontWeight: brand.id === device.selectedBrand.id && '500'}}
                    key={brand.id}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;

const Row = styled.div`
    display: flex;
    margin-bottom: 16px;
`

const Card = styled.div`
    display: flex;
    cursor: pointer;
    margin-right: 10px;
    padding: 5px;
    font-size: 18px;
`
