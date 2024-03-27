'use client';

import { useFormStatus } from 'react-dom';
import { forwardRef, KeyboardEventHandler } from 'react';

import { cn } from '~/lib/utils';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';

import { FormErrors } from './form-errors';

type Props = {
    id: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    defaultValue?: string;
};

export const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(
    (
        {
            id,
            label,
            placeholder,
            required,
            disabled,
            errors,
            onBlur,
            onClick,
            onKeyDown,
            className,
            defaultValue,
        },
        ref
    ) => {
        const { pending } = useFormStatus();

        return (
            <div className="w-full space-y-2">
                <div className="w-full space-y-1">
                    {label ? (
                        <Label
                            className="text-xs font-semibold text-neutral-700"
                            htmlFor={id}
                        >
                            {label}
                        </Label>
                    ) : null}
                    <Textarea
                        aria-describedby={`${id}-error`}
                        className={cn(
                            'resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                            className
                        )}
                        defaultValue={defaultValue}
                        disabled={pending || disabled}
                        id={id}
                        name={id}
                        onBlur={onBlur}
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                        placeholder={placeholder}
                        ref={ref}
                        required={required}
                    />
                </div>
                <FormErrors errors={errors} id={id} />
            </div>
        );
    }
);

FormTextarea.displayName = 'FormTextarea';

FormTextarea.defaultProps = {
    label: undefined,
    placeholder: undefined,
    required: undefined,
    disabled: undefined,
    errors: undefined,
    className: undefined,
    onBlur: undefined,
    onClick: undefined,
    onKeyDown: undefined,
    defaultValue: undefined,
};
