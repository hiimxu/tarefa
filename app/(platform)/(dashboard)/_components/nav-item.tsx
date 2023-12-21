'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { Activity, CreditCard, Layout, Settings } from 'lucide-react';
import { Skeleton } from '~/components/ui/skeleton';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Organization } from '~/common/types';

type Props = {
    isExpanded: boolean;
    isActive: boolean;
    organization: Organization;
    onExpand: (id: string) => void;
};

const NavItem: React.FC<Props> = ({
    isExpanded,
    isActive,
    organization,
    onExpand,
}) => {
    const router = useRouter();
    const pathname = usePathname();

    const routes = [
        {
            label: 'Boards',
            icon: <Layout className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}`,
        },
        {
            label: 'Activity',
            icon: <Activity className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/activity`,
        },
        {
            label: 'Settings',
            icon: <Settings className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/settings`,
        },
        {
            label: 'Billing',
            icon: <CreditCard className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/billing`,
        },
    ];

    const onClick = (href: string) => {
        router.push(href);
    };

    return (
        <AccordionItem className="border-none" value={organization.id}>
            <AccordionTrigger
                className={cn(
                    'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md transition text-start no-underline hover:no-underline',
                    'hover:bg-neutral-500/10 hover:no-underline',
                    isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
                )}
                onClick={() => onExpand(organization.id)}
            >
                <div className="flex items-center gap-x-2">
                    <div className="w-7 h-7 relative">
                        <Image
                            alt="Organization"
                            className="rounded-sm object-cover"
                            fill
                            src={organization.imageUrl}
                        />
                    </div>
                    <span className="font-medium text-sm">
                        {organization.name}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
                {routes.map((route) => (
                    <Button
                        className={cn(
                            'w-full font-normal justify-start pl-10 mb-1',
                            pathname === route.href &&
                                'bg-sky-500/10 text-sky-700'
                        )}
                        key={route.href}
                        onClick={() => onClick(route.href)}
                        size="sm"
                        variant="ghost"
                    >
                        {route.icon}
                        {route.label}
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    );
};

export const SkeletonNavItem = () => {
    return (
        <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 relative shrink-0">
                <Skeleton className="h-full w-full absolute" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    );
};

export default NavItem;
