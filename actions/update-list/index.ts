'use server';

import { auth } from '@clerk/nextjs';
import { db } from '~/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '~/lib/create-safe-action';
import { createAuditLog } from '~/lib/create-audit-log';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { InputType, ReturnType } from './type';
import { UpdateList } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
    const { orgId, userId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorize',
        };
    }

    const { id, title, boardId } = data;

    let list;

    try {
        list = await db.list.update({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
            data: {
                title,
            },
        });

        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.UPDATE,
        });
    } catch (error) {
        return {
            error: 'Failed too update',
        };
    }

    revalidatePath(`/board/${boardId}`);
    return {
        data: list,
    };
};

export const updateList = createSafeAction(UpdateList, handler);
