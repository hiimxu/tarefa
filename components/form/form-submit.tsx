'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '~/lib/utils';
import { Button } from '../ui/button';

type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link'
        | 'primary';
};

export const FormSubmit = ({
    children,
    disabled,
    className,
    variant,
}: Props) => {
    const { pending } = useFormStatus();

    return (
        <Button
            className={cn(className)}
            disabled={pending || disabled}
            size="sm"
            type="submit"
            variant={variant}
        >
            {children}
        </Button>
    );
};

FormSubmit.defaultProps = {
    disabled: undefined,
    className: undefined,
    variant: 'primary',
};
