import { Card } from '@prisma/client';
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { useCardModal } from '~/hooks/use-card-modal';

type Props = {
    data: Card;
    index: number;
};

const CardItem = ({ data, index }: Props) => {
    const { onOpen } = useCardModal();

    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
                    onClick={() => onOpen(data.id)}
                    ref={provided.innerRef}
                    role="presentation"
                >
                    {data.title}
                </div>
            )}
        </Draggable>
    );
};

export default CardItem;
