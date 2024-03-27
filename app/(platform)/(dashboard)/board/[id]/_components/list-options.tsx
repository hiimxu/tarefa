'use client';

import { List } from '@prisma/client';
import React, { ElementRef, useRef } from 'react';
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { MoreHorizontal, X } from 'lucide-react';
import { FormSubmit } from '~/components/form/form-submit';
import { Separator } from '~/components/ui/separator';
import { useAction } from '~/hooks/use-action';
import { toast } from 'sonner';
import { deleteList } from '~/actions/delete-list';
import { copyList } from '~/actions/copy-list';

type Props = {
    data: List;
    onAddCard: () => void;
};

export const ListOptions = ({ data, onAddCard }: Props) => {
    const closeRef = useRef<ElementRef<'button'>>(null);

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (res) => {
            toast.success(`List "${res.title}" deleted`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: (res) => {
            toast.success(`List "${res.title}" copied`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onDelete = (formData: FormData) => {
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        executeDelete({ id, boardId });
    };

    const onCopy = (formData: FormData) => {
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        executeCopy({ id, boardId });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="px-0 pb-3 pt-3"
                side="bottom"
            >
                <div className="pb-4 text-center text-sm font-medium text-neutral-600">
                    List
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button
                        className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button
                    className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
                    onClick={onAddCard}
                    variant="ghost"
                >
                    Add card...
                </Button>
                <form action={onCopy}>
                    <input hidden id="id" name="id" value={data.id} />
                    <input
                        hidden
                        id="boardId"
                        name="boardId"
                        value={data.boardId}
                    />
                    <FormSubmit
                        className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
                        variant="ghost"
                    >
                        Copy list...
                    </FormSubmit>
                </form>
                <Separator />
                <form action={onDelete}>
                    <input hidden id="id" name="id" value={data.id} />
                    <input
                        hidden
                        id="boardId"
                        name="boardId"
                        value={data.boardId}
                    />
                    <FormSubmit
                        className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
                        variant="ghost"
                    >
                        Delete this list
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
