'use server';

import { auth } from '@clerk/nextjs';
import { db } from '~/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '~/lib/create-safe-action';
import { InputType, ReturnType } from './type';
import { UpdateBoard } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
    const { orgId, userId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorize',
        };
    }

    const { id, title } = data;

    let board;

    try {
        board = await db.board.update({
            where: {
                id,
                orgId,
            },
            data: {
                title,
            },
        });
    } catch (error) {
        return {
            error: 'Failed too update',
        };
    }

    revalidatePath(`/board/${id}`);
    return {
        data: board,
    };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
