'use client';

import React, { ElementRef, useRef } from 'react';
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from '~/components/ui/popover';
import { X } from 'lucide-react';
import { useAction } from '~/hooks/use-action';
import { createBoard } from '~/actions/create-board';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { FormInput } from './form-input';
import { FormSubmit } from './form-submit';
import { FormPicker } from './form-picker';

type Props = {
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
};

export const FormPopover = ({ children, side, align, sideOffset }: Props) => {
    const { push } = useRouter();

    const closeRef = useRef<ElementRef<'button'>>(null);

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            toast.success('Board created!');
            closeRef.current?.click();
            push(`/board/${data.id}`);
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const image = formData.get('image') as string;

        execute({ title, image });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="pb-4 text-center text-sm font-medium text-neutral-600">
                    Create board
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button
                        className="absolute right-1 top-2 h-auto w-auto p-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormPicker errors={fieldErrors} id="image" />
                        <FormInput
                            errors={fieldErrors}
                            id="title"
                            label="Board title"
                            type="text"
                        />
                    </div>
                    <FormSubmit className="w-full">Create</FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};

FormPopover.defaultProps = {
    side: 'bottom',
    align: undefined,
    sideOffset: 0,
};
