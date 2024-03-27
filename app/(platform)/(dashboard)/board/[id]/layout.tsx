import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { db } from '~/lib/db';
import { BoardNavbar } from './_components/board-navbar';

export const generateMetadata = async ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    const { orgId } = auth();
    if (!orgId) {
        return {
            title: 'Board',
        };
    }

    const board = await db.board.findUnique({
        where: {
            id: params.id,
            orgId,
        },
    });

    return {
        title: board?.title || 'Board',
    };
};

const BoardIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {
        id: string;
    };
}) => {
    const { orgId } = auth();

    if (!orgId) {
        redirect('/select-org');
    }

    const board = await db.board.findUnique({
        where: {
            id: params.id,
            orgId,
        },
    });

    if (!board) {
        notFound();
    }

    return (
        <div
            className="relative h-full bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${board.imageFullUrl})`,
            }}
        >
            <BoardNavbar data={board} />
            <div className="absolute inset-0 bg-black/10" />
            <main className="relative h-full pt-28">{children}</main>
        </div>
    );
};

export default BoardIdLayout;
