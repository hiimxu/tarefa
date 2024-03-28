'use client';

import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';
import { ElementRef, forwardRef, KeyboardEventHandler, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { useAction } from '~/hooks/use-action';
import { createCard } from '~/actions/create-card';
import { Button } from '~/components/ui/button';
import { FormSubmit } from '~/components/form/form-submit';
import { FormTextarea } from '~/components/form/form-textarea';

type Props = {
    listId: string;
    enableEditing: () => void;
    disableEditing: () => void;
    isEditing: boolean;
};

export const CardForm = forwardRef<HTMLTextAreaElement, Props>(
    ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
        const params = useParams();
        const formRef = useRef<ElementRef<'form'>>(null);

        const { execute, fieldErrors } = useAction(createCard, {
            onSuccess: (data) => {
                toast.success(`Card "${data.title}" created`);
                formRef.current?.reset();
            },
            onError: (error) => {
                toast.error(error);
            },
        });

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                disableEditing();
            }
        };

        useOnClickOutside(formRef, disableEditing);
        useEventListener('keydown', onKeyDown);

        const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
            e
        ) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
            }
        };

        const onSubmit = (formData: FormData) => {
            const title = formData.get('title') as string;
            const listIdInput = formData.get('listId') as string;
            const boardId = params.id as string;

            execute({ title, listId: listIdInput, boardId });
        };

        if (isEditing) {
            return (
                <form
                    action={onSubmit}
                    className="m-1 space-y-4 px-1 py-0.5"
                    ref={formRef}
                >
                    <FormTextarea
                        errors={fieldErrors}
                        id="title"
                        onKeyDown={onTextareaKeyDown}
                        placeholder="Enter a title for this card..."
                        ref={ref}
                    />
                    <input hidden id="listId" name="listId" value={listId} />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>Add card</FormSubmit>
                        <Button
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            );
        }

        return (
            <div className="px-2 pt-2">
                <Button
                    className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
                    onClick={enableEditing}
                    size="sm"
                    variant="ghost"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add a card
                </Button>
            </div>
        );
    }
);

CardForm.displayName = 'CardForm';
