import { Card } from '@prisma/client';
import React from 'react';

type Props = {
    data: Card;
    index: number;
};

const CardItem = ({ data, index }: Props) => {
    return (
        <div className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black">
            {data.title}
        </div>
    );
};

export default CardItem;
