'use client';

import { ListWithCards } from '~/type';
import { ListForm } from './list-form';

type Props = {
    data: ListWithCards[];
    boardId: string;
};

export const ListContainer = ({ data, boardId }: Props) => {
    return (
        <ol>
            <ListForm />
            <div className="flex-shrink-0 w1" />
        </ol>
    );
};
