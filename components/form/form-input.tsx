'use client';

import React, { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { cn } from '~/lib/utils';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FormErrors } from './form-errors';

type Props = {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string;
    onBlur?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, Props>(
    (
        {
            id,
            label,
            type,
            placeholder,
            required,
            disabled,
            errors,
            className,
            defaultValue,
            onBlur,
        },
        ref
    ) => {
        const { pending } = useFormStatus();

        return (
            <div className="space-y-2">
                <div className="space-y-1">
                    {label ? (
                        <Label
                            className="text-xs font-semibold text-neutral-700"
                            htmlFor={id}
                        >
                            {label}
                        </Label>
                    ) : null}
                    <Input
                        aria-describedby={`${id}-error`}
                        className={cn('text-sm px-2 py-1 h-7', className)}
                        defaultValue={defaultValue}
                        disabled={pending || disabled}
                        id={id}
                        name={id}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        ref={ref}
                        required={required}
                        type={type}
                    />
                    <FormErrors errors={errors} id={id} />
                </div>
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';

FormInput.defaultProps = {
    label: undefined,
    type: undefined,
    placeholder: undefined,
    required: undefined,
    disabled: undefined,
    errors: undefined,
    className: undefined,
    defaultValue: '',
    onBlur: undefined,
};
