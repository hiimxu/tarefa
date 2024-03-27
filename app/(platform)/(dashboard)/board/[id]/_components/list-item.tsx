'use client';

import React, { ElementRef, useRef, useState } from 'react';
import { ListWithCards } from '~/type';
import { cn } from '~/lib/utils';
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
        <li className="h-full w-[272px] shrink-0 select-none">
            <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
                <ListHeader data={data} onAddCard={enableEditing} />
                <ol
                    className={cn(
                        'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
                        data.cards.length > 0 ? 'mt-2' : 'mt-0'
                    )}
                >
                    {data.cards.map((item, index) => (
                        <CardItem data={item} index={index} key={item.id} />
                    ))}
                </ol>
                <CardForm
                    disableEditing={disableEditing}
                    enableEditing={enableEditing}
                    isEditing={isEditing}
                    listId={data.id}
                    ref={textareaRef}
                />
            </div>
        </li>
    );
};
