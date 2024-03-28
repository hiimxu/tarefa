'use client';

import { Copy, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { copyCard } from '~/actions/copy-card';
import { deleteCard } from '~/actions/delete-card';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { useAction } from '~/hooks/use-action';
import { useCardModal } from '~/hooks/use-card-modal';
import { CardWithList } from '~/type';

type Props = {
    data: CardWithList;
};

export const Actions = ({ data }: Props) => {
    const params = useParams();

    const { onClose } = useCardModal();

    const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
        copyCard,
        {
            onSuccess: (res) => {
                toast.success(`Card "${res.title}" copied`);
                onClose();
            },
            onError: (error) => {
                toast.error(error);
            },
        }
    );

    const { execute: executeDeleteCard, isLoading: isLoadingDelete } =
        useAction(deleteCard, {
            onSuccess: (res) => {
                toast.success(`Card "${res.title}" deleted`);
                onClose();
            },
            onError: (error) => {
                toast.error(error);
            },
        });

    const onCopy = () => {
        const boardId = params.id as string;

        executeCopyCard({ id: data.id, boardId });
    };

    const onDelete = () => {
        const boardId = params.id as string;

        executeDeleteCard({ id: data.id, boardId });
    };

    return (
        <div className="mt-2 space-y-2">
            <p className="text-xs font-semibold">Actions</p>
            <Button
                className="w-full justify-start"
                disabled={isLoadingCopy}
                onClick={onCopy}
                size="inline"
                variant="gray"
            >
                <Copy className="mr-2 h-4 w-4" />
                Copy
            </Button>
            <Button
                className="w-full justify-start"
                disabled={isLoadingDelete}
                onClick={onDelete}
                size="inline"
                variant="gray"
            >
                <Trash className="mr-2 h-4 w-4" />
                Delete
            </Button>
        </div>
    );
};

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="mt-2 space-y-2">
            <Skeleton className="h-4 w-20 bg-neutral-200" />
            <Skeleton className="h-8 w-full bg-neutral-200" />
            <Skeleton className="h-8 w-full bg-neutral-200" />
        </div>
    );
};
