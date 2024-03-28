import React, { Suspense } from 'react';
import { Separator } from '~/components/ui/separator';
import { cn } from '~/lib/utils';
import Info from './_components/info';
import BoardList from './_components/board-list';

const OrganizationPage = async () => {
    return (
        <div className="mb-20 w-full">
            <Info />
            <Separator className="my-4" />
            <div className={cn('px-2', 'md:px-4')}>
                <Suspense fallback={<BoardList.Skeleton />}>
                    <BoardList />
                </Suspense>
            </div>
        </div>
    );
};

export default OrganizationPage;
