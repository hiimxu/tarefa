'use client';

import React, { ElementRef, useRef, useState } from 'react';
import { ListWithCards } from '~/type';
import { cn } from '~/lib/utils';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ListHeader } from './list-header';
import { CardForm } from './card-form';
import CardItem from './card-item';

type Props = {
    data: ListWithCards;
    index: number;
};

export const ListItem = ({ data, index }: Props) => {
    const textareaRef = useRef<ElementRef<'textarea'>>(null);

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const disableEditing = () => {
        setIsEditing(false);
    };

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    };

    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <li
                    {...provided.draggableProps}
                    className="h-full w-[272px] shrink-0 select-none"
                    ref={provided.innerRef}
                >
                    <div
                        {...provided.dragHandleProps}
                        className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md"
                    >
                        <ListHeader data={data} onAddCard={enableEditing} />
                        <Droppable droppableId={data.id} type="card">
                            {(dropProvided) => (
                                <ol
                                    className={cn(
                                        'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
                                        data.cards.length > 0 ? 'mt-2' : 'mt-0'
                                    )}
                                    ref={dropProvided.innerRef}
                                    {...dropProvided.droppableProps}
                                >
                                    {data.cards.map((item, idx) => (
                                        <CardItem
                                            data={item}
                                            index={idx}
                                            key={item.id}
                                        />
                                    ))}
                                    {dropProvided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                        <CardForm
                            disableEditing={disableEditing}
                            enableEditing={enableEditing}
                            isEditing={isEditing}
                            listId={data.id}
                            ref={textareaRef}
                        />
                    </div>
                </li>
            )}
        </Draggable>
    );
};
