'use client';

import { useQueryClient } from '@tanstack/react-query';
import { AlignLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { updateCard } from '~/actions/update-card';
import { FormSubmit } from '~/components/form/form-submit';
import { FormTextarea } from '~/components/form/form-textarea';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { useAction } from '~/hooks/use-action';
import { CardWithList } from '~/type';

type Props = {
    data: CardWithList;
};

export const Description = ({ data }: Props) => {
    const queryClient = useQueryClient();
    const params = useParams();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const textareaRef = useRef<ElementRef<'textarea'>>(null);
    const formRef = useRef<ElementRef<'form'>>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing();
        }
    };

    useEventListener('keydown', onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ['card', res.id],
            });
            queryClient.invalidateQueries({
                queryKey: ['card-logs', res.id],
            });
            toast.success(`Card "${res.title}" updated`);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const description = formData.get('description') as string;
        const boardId = params.id as string;

        execute({
            id: data.id,
            description,
            boardId,
        });
    };

    return (
        <div className="flex w-full items-start gap-x-3">
            <AlignLeft className="mt-0.5 h-5 w-5 text-neutral-700" />
            <div className="w-full">
                <p className="mb-2 font-semibold text-neutral-700">
                    Description
                </p>
                {isEditing ? (
                    <form action={onSubmit} className="space-y-2" ref={formRef}>
                        <FormTextarea
                            className="mt-2 w-full"
                            defaultValue={data.description || undefined}
                            errors={fieldErrors}
                            id="description"
                            placeholder="Add a more detailed description..."
                        />
                        <div className="flex items-center gap-x-2">
                            <FormSubmit>Save</FormSubmit>
                            <Button
                                onClick={disableEditing}
                                size="sm"
                                type="button"
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        className="min-h-[78px] rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium"
                        onClick={enableEditing}
                        role="presentation"
                    >
                        {data.description ||
                            'Add a more detailed description...'}
                    </div>
                )}
            </div>
        </div>
    );
};

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex w-full items-start gap-x-3">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
                <Skeleton className="h-[78px] w-full bg-neutral-200" />
            </div>
        </div>
    );
};
