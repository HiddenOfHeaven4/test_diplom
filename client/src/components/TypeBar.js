import React, {useCallback, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

// Создание таблицы для вывода к нужному товару, полагаясь на типы и бренды. Применялся хук useCallback для возращения аргумента еще раз.

const TypeBar = observer(() => {
    const {device} = useContext(Context);

    const getAllDevices = useCallback(() => {
        device.setSelectedType("all");
        device.setSelectedBrand("all");
    }, [device])

    return (
        <ListGroup>
            <ListGroup.Item
                style={ "all" === device.selectedType ? {...item,...activeItem} : {...item}}
                onClick={getAllDevices}
            >
                Все категории
            </ListGroup.Item>
            {device.types.map(type =>
                <ListGroup.Item
                    style={ type.id === device.selectedType.id ? {...item, ...activeItem} : {...item}}
                    key={type.id}
                    onClick={() => device.setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;

const item = {
    cursor: 'pointer',
    color: '#0C0E13',
    fontSize: 18,
    lineHeight: '24px',
    border: 'none'
}

const activeItem = {
    backgroundColor: 'transparent',
    fontWeight: '700'
    
}
