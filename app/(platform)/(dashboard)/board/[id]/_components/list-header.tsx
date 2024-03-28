'use client';

import { List } from '@prisma/client';
import React, { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';
import { updateList } from '~/actions/update-list';
import { FormInput } from '~/components/form/form-input';
import { useAction } from '~/hooks/use-action';
import { ListOptions } from './list-options';

type Props = {
    data: List;
    onAddCard: () => void;
};

export const ListHeader = ({ data, onAddCard }: Props) => {
    const [title, setTitle] = useState<string>(data.title);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const formRef = useRef<ElementRef<'form'>>(null);
    const inputRef = useRef<ElementRef<'input'>>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const { execute } = useAction(updateList, {
        onSuccess: (res) => {
            toast.success(`Rename to "${res.title}"`);
            setTitle(res.title);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const titleInput = formData.get('title') as string;
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        if (titleInput === data.title) {
            return disableEditing();
        }

        return execute({
            title: titleInput,
            id,
            boardId,
        });
    };
    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            formRef.current?.requestSubmit();
        }
    };

    useEventListener('keydown', onKeyDown);

    return (
        <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
            {isEditing ? (
                <form
                    action={onSubmit}
                    className="flex-1 px-[2px]"
                    ref={formRef}
                >
                    <input hidden id="id" name="id" value={data.id} />
                    <input
                        hidden
                        id="boardId"
                        name="boardId"
                        value={data.boardId}
                    />
                    <FormInput
                        className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
                        defaultValue={title}
                        id="title"
                        onBlur={onBlur}
                        placeholder="Enter list title..."
                        ref={inputRef}
                    />
                    <button hidden type="submit">
                        Submit
                    </button>
                </form>
            ) : (
                <div
                    className="h-7 w-full border-transparent px-2.5 pt-1 text-sm font-medium"
                    onClick={enableEditing}
                    role="presentation"
                >
                    {data?.title}
                </div>
            )}
            <ListOptions data={data} onAddCard={onAddCard} />
        </div>
    );
};
