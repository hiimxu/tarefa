import { useCallback, useState } from 'react';
import { ActionState, FieldErrors } from '~/lib/create-safe-action';

type Action<T, U> = (data: T) => Promise<ActionState<T, U>>;

type UseActionOption<T> = {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    onComplete?: () => void;
};

export const useAction = <T, U>(
    action: Action<T, U>,
    options: UseActionOption<U> = {}
) => {
    const [fieldErrors, setFieldErrors] = useState<FieldErrors<T> | undefined>(
        undefined
    );

    const [error, setError] = useState<string | undefined>(undefined);
    const [data, setData] = useState<U | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const execute = useCallback(
        async (input: T) => {
            setIsLoading(true);

            try {
                const result = await action(input);

                if (!result) {
                    return;
                }

                setFieldErrors(result.fieldErrors);

                if (result.error) {
                    setError(result.error);
                    options.onError?.(result.error);
                }

                if (result.data) {
                    setData(result.data);
                    options.onSuccess?.(result.data);
                }
            } finally {
                setIsLoading(false);
                options.onComplete?.();
            }
        },
        [action, options]
    );

    return {
        execute,
        fieldErrors,
        error,
        data,
        isLoading,
    };
};
