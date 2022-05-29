import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import DeviceItem from "./deviceItem";
import styled from 'styled-components';

// Логика создания списка товара с применением state manager (MobX)

export default observer(() => {
    const {device} = useContext(Context);

    return (
        <Container>
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device}/>
            )}
        </Container>
    );
});

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
`
