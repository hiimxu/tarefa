import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';
import { db } from '~/lib/db';
import { ListContainer } from './_components/list-container';

type Props = {
    params: {
        id: string;
    };
};

const BoardIdPage = async ({ params }: Props) => {
    const { orgId } = auth();

    if (!orgId) {
        redirect('/select-org');
    }

    const lists = await db.list.findMany({
        where: {
            boardId: params.id,
            board: {
                orgId,
            },
        },
        include: {
            cards: {
                orderBy: {
                    order: 'asc',
                },
            },
        },
        orderBy: {
            order: 'asc',
        },
    });

    return (
        <div className="p-4 h-full overflow-x-auto">
            <ListContainer boardId={params.id} data={lists} />
        </div>
    );
};

export default BoardIdPage;
