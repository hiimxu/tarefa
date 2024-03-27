'use client';

import { ListWithCards } from '~/type';
import { useEffect, useState } from 'react';
import { ListForm } from './list-form';
import { ListItem } from './list-item';

type Props = {
    data: ListWithCards[];
    boardId: string;
};

export const ListContainer = ({ data, boardId }: Props) => {
    const [orderData, setOrderData] = useState(data);

    useEffect(() => {
        setOrderData(data);
    }, [data]);

    return (
        <ol className="flex gap-3 h-full">
            {orderData?.map((item, index) => (
                <ListItem data={item} index={index} key={item.id} />
            ))}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
        </ol>
    );
};
