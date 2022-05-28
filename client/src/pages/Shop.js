import React, {useContext, useEffect} from 'react';
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevice, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import styled from 'styled-components';

export default observer(() => {
    const {device} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevice(null, null, 1, 9).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, []);

    useEffect(
        () => {
            if(device.selectedType === "all") {
                    fetchDevice(null, device.selectedBrand.id, device.page, 9).then(data => {
                        device.setDevices(data.rows);
                        device.setTotalCount(data.count);
                    });
                } else {
                    fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, 9).then(data => {
                        device.setDevices(data.rows);
                        device.setTotalCount(data.count);
                    });
                }
        }, [device.page, device.selectedType, device.selectedBrand],
    );

    return (
        <Container>
                <SideBar>
                    <TypeBar/>
                </SideBar>
                <Catalog>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Catalog>
        </Container>
    );
});

const Container = styled.div`
    display: flex;
    width: 100%;
    margin-top: 32px;
`
const SideBar = styled.div`
    flex: 3;
    margin-right: 40px;
`

const Catalog = styled.div`
    flex: 9;
`