'use client';

import { ListWithCards } from '~/type';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { useAction } from '~/hooks/use-action';
import { updateListOrder } from '~/actions/update-list-order';
import { toast } from 'sonner';
import { updateCardOrder } from '~/actions/update-card-order';
import { ListItem } from './list-item';
import { ListForm } from './list-form';

type Props = {
    data: ListWithCards[];
    boardId: string;
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

export const ListContainer = ({ data, boardId }: Props) => {
    const [orderData, setOrderData] = useState(data);

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: () => {
            toast.success('List reordered');
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: () => {
            toast.success('Card reordered');
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    useEffect(() => {
        setOrderData(data);
    }, [data]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'list') {
            const items = reorder(
                orderData,
                source.index,
                destination.index
            ).map((item, index) => ({ ...item, order: index }));

            setOrderData(items);
            executeUpdateListOrder({ items, boardId });
        }

        if (type === 'card') {
            const newOrderedData = [...orderData];
            const sourceList = newOrderedData.find(
                (item) => item.id === source.droppableId
            );
            const destList = newOrderedData.find(
                (item) => item.id === destination.droppableId
            );

            if (!sourceList || !destList) {
                return;
            }

            if (!sourceList.cards) {
                sourceList.cards = [];
            }

            if (!destList.cards) {
                destList.cards = [];
            }

            if (source.droppableId === destination.droppableId) {
                const reorderedCard = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                );

                reorderedCard.forEach((card, idx) => {
                    card.order = idx;
                });

                sourceList.cards = reorderedCard;

                setOrderData(newOrderedData);
                executeUpdateCardOrder({
                    boardId,
                    items: reorderedCard,
                });
            } else {
                const [movedCard] = sourceList.cards.splice(source.index, 1);

                movedCard.listId = destination.droppableId;
                destList.cards.splice(destination.index, 0, movedCard);

                sourceList.cards.forEach((card, idx) => {
                    card.order = idx;
                });

                destList.cards.forEach((card, idx) => {
                    card.order = idx;
                });

                setOrderData(newOrderedData);
                executeUpdateCardOrder({
                    boardId,
                    items: destList.cards,
                });
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable direction="horizontal" droppableId="lists" type="list">
                {(provided) => (
                    <ol
                        {...provided.droppableProps}
                        className="flex h-full gap-3"
                        ref={provided.innerRef}
                    >
                        {orderData?.map((item, index) => (
                            <ListItem data={item} index={index} key={item.id} />
                        ))}
                        {provided.placeholder}
                        <ListForm />
                        <div className="w-1 flex-shrink-0" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    );
};
