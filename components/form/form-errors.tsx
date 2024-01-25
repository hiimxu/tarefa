import { XCircle } from 'lucide-react';

type Props = {
    id: string;
    errors?: Record<string, string[] | undefined>;
};

export const FormErrors = ({ id, errors }: Props) => {
    if (!errors) {
        return null;
    }

    return (
        <div
            aria-live="polite"
            className="mt-2 text-xs text-red-500"
            id={`${id}-error`}
        >
            {errors?.[id]?.map((item: string) => (
                <div
                    className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
                    key={item}
                >
                    <XCircle className="h-4 w-4 mr-2" />
                    {item}
                </div>
            ))}
        </div>
    );
};

FormErrors.defaultProps = {
    errors: undefined,
};
