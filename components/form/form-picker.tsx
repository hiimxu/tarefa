'use client';

import { Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { unsplash } from '~/lib/unsplash';
import { cn } from '~/lib/utils';
import { defaultImages } from '~/constants/images';
import Link from 'next/link';
import { FormErrors } from './form-errors';

type Props = {
    id: string;
    errors?: Record<string, string[] | undefined>;
};

export const FormPicker = ({ id, errors }: Props) => {
    const { pending } = useFormStatus();

    const [images, setImages] =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useState<Array<Record<string, any>>>(defaultImages);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ['317099'],
                    count: 9,
                });

                if (result && result.response) {
                    const imagesResult = result.response as Array<
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        Record<string, any>
                    >;
                    setImages(imagesResult);
                } else {
                    toast.error('Failed to get images from Unsplash');
                }
            } catch (error) {
                setImages(defaultImages);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6">
                <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="mb-2 grid grid-cols-3 gap-2">
                {images.map((item) => (
                    <div
                        className={cn(
                            'group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75',
                            pending && 'cursor-auto opacity-50 hover:opacity-50'
                        )}
                        key={item.id}
                        onClick={() => {
                            if (pending) {
                                return;
                            }

                            setSelectedImageId(item.id);
                        }}
                        role="presentation"
                    >
                        <input
                            checked={selectedImageId === item.id}
                            className="hidden"
                            disabled={pending}
                            id={id}
                            name={id}
                            type="radio"
                            value={`${item.id}|${item.urls.thumb}|${item.urls.full}|${item.links.html}|${item.user.name}`}
                        />
                        <Image
                            alt="Unsplash image"
                            className="rounded-sm object-cover"
                            fill
                            src={item.urls.thumb}
                        />
                        {selectedImageId === item.id && (
                            <div className="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30">
                                <Check className="h-4 w-4 text-white" />
                            </div>
                        )}
                        <Link
                            className={cn(
                                'absolute bottom-0 w-full truncate bg-black/10 p-1 text-[10px] text-white opacity-0',
                                'hover:underline group-hover:opacity-100'
                            )}
                            href={item.links.html}
                            target="_blank"
                        >
                            {item.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            <FormErrors errors={errors} id="image" />
        </div>
    );
};

FormPicker.defaultProps = {
    errors: undefined,
};
