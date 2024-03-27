'use client';

import { useOrganization } from '@clerk/nextjs';
import { CreditCard } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Skeleton } from '~/components/ui/skeleton';

const Info = () => {
    const { organization, isLoaded } = useOrganization();

    if (!isLoaded) {
        return <Info.Skeleton />;
    }

    return (
        <div className="flex items-center gap-x-4">
            <div className="relative h-[60px] w-[60px]">
                <Image
                    alt="Organization"
                    className="rounded-md object-cover"
                    fill
                    src={organization?.imageUrl || ''}
                />
            </div>
            <div className="space-y-1">
                <p className="text-xl font-semibold">{organization?.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                    <CreditCard className="mr-1 h-3 w-3" />
                    Free
                </div>
            </div>
        </div>
    );
};

Info.Skeleton = function SkeletonInfo() {
    return (
        <div className="flex items-center gap-x-4">
            <div className="relative h-[60px] w-[60px]">
                <Skeleton className="absolute h-full w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-[200px]" />
                <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    );
};

export default Info;
