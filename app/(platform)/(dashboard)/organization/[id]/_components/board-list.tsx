import { auth } from '@clerk/nextjs';
import { HelpCircle, User2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FormPopover } from '~/components/form/form-popover';
import Hint from '~/components/hint';
import { Skeleton } from '~/components/ui/skeleton';
import { db } from '~/lib/db';
import { cn } from '~/lib/utils';

const BoardList = async () => {
    const { orgId } = auth();

    if (!orgId) {
        return redirect('/select-org');
    }

    const boards = await db.board.findMany({
        where: {
            orgId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center text-lg font-semibold text-neutral-700">
                <User2 className="mr-2 h-6 w-6" />
                Your boards
            </div>
            <div
                className={cn(
                    'grid grid-cols-2 gap-4',
                    'sm:grid-cols-3',
                    'lg:grid-cols-4'
                )}
            >
                {boards.map((item) => (
                    <Link
                        className="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
                        href={`/board/${item.id}`}
                        key={item.id}
                        style={{
                            backgroundImage: `url(${item.imageThumbUrl})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
                        <p className="relative font-semibold text-white">
                            {item.title}
                        </p>
                    </Link>
                ))}
                <FormPopover side="right" sideOffset={10}>
                    <div
                        className={cn(
                            'relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted',
                            'transition hover:opacity-75'
                        )}
                        role="button"
                    >
                        <p className="text-sm">Create new board</p>
                        <span className="text-xs">5 remaining</span>
                        <Hint
                            description="Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
                            sideOffset={40}
                        >
                            <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    );
};

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div
            className={cn(
                'grid grid-cols-2 gap-4',
                'sm:grid-cols-3',
                'lg:grid-cols-4'
            )}
        >
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
        </div>
    );
};

export default BoardList;
