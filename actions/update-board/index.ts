'use server';

import { auth } from '@clerk/nextjs';
import { db } from '~/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '~/lib/create-safe-action';
import { createAuditLog } from '~/lib/create-audit-log';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
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

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.UPDATE,
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
