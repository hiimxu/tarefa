'use client';

import { Board } from '@prisma/client';
import React, { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { updateBoard } from '~/actions/update-board';
import { FormInput } from '~/components/form/form-input';
import { Button } from '~/components/ui/button';
import { useAction } from '~/hooks/use-action';
import { cn } from '~/lib/utils';

type Props = {
    data: Board;
};

const BoardTitleForm = ({ data }: Props) => {
    const formRef = useRef<ElementRef<'form'>>(null);
    const inputRef = useRef<ElementRef<'input'>>(null);

    const [title, setTitle] = useState<string | undefined>(data.title);
    const [isEditing, setIsEditing] = useState<boolean>(false);

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

    const { execute } = useAction(updateBoard, {
        onSuccess: (res) => {
            toast.success(`Board "${res.title}" updated!`);
            setTitle(res.title);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const titleForm = formData.get('title') as string;
        execute({
            title: titleForm,
            id: data.id,
        });
    };

    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    if (isEditing) {
        return (
            <form
                action={onSubmit}
                className="flex items-center gap-x-2"
                ref={formRef}
            >
                <FormInput
                    className={cn(
                        'h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold',
                        'focus-visible:outline-none focus-visible:ring-transparent'
                    )}
                    defaultValue={title}
                    id="title"
                    onBlur={onBlur}
                    ref={inputRef}
                />
            </form>
        );
    }

    return (
        <Button
            className="h-auto w-auto p-1 px-2 text-lg font-bold"
            onClick={enableEditing}
            variant="transparent"
        >
            {title}
        </Button>
    );
};

export default BoardTitleForm;
