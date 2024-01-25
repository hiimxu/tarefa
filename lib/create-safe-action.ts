import { z } from 'zod';

export type FieldErrors<T> = {
    [K in keyof T]?: string[];
};

export type ActionState<T, U> = {
    fieldErrors?: FieldErrors<T>;
    error?: string | null;
    data?: U;
};

export const createSafeAction = <T, U>(
    schema: z.Schema<T>,
    handler: (validatedData: T) => Promise<ActionState<T, U>>
) => {
    return async (data: T): Promise<ActionState<T, U>> => {
        const validationResult = schema.safeParse(data);
        if (!validationResult.success) {
            return {
                fieldErrors: validationResult.error.flatten()
                    .fieldErrors as FieldErrors<T>,
            };
        }

        return handler(validationResult.data);
    };
};
