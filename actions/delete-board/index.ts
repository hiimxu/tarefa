'use server';

import { auth } from '@clerk/nextjs';
import { db } from '~/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '~/lib/create-safe-action';
import { redirect } from 'next/navigation';
import { InputType, ReturnType } from './type';
import { DeleteBoard } from './schema';

// eslint-disable-next-line consistent-return
const handler = async (data: InputType): Promise<ReturnType> => {
    const { orgId, userId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorize',
        };
    }

    const { id } = data;

    let board;

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        board = await db.board.delete({
            where: {
                id,
                orgId,
            },
        });
    } catch (error) {
        return {
            error: 'Failed too delete',
        };
    }

    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
