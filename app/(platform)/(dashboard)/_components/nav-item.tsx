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
            icon: <Layout className="mr-2 h-4 w-4" />,
            href: `/organization/${organization.id}`,
        },
        {
            label: 'Activity',
            icon: <Activity className="mr-2 h-4 w-4" />,
            href: `/organization/${organization.id}/activity`,
        },
        {
            label: 'Settings',
            icon: <Settings className="mr-2 h-4 w-4" />,
            href: `/organization/${organization.id}/settings`,
        },
        {
            label: 'Billing',
            icon: <CreditCard className="mr-2 h-4 w-4" />,
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
                    'flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:no-underline',
                    'hover:bg-neutral-500/10 hover:no-underline',
                    isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
                )}
                onClick={() => onExpand(organization.id)}
            >
                <div className="flex items-center gap-x-2">
                    <div className="relative h-7 w-7">
                        <Image
                            alt="Organization"
                            className="rounded-sm object-cover"
                            fill
                            src={organization.imageUrl}
                        />
                    </div>
                    <span className="text-sm font-medium">
                        {organization.name}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
                {routes.map((route) => (
                    <Button
                        className={cn(
                            'mb-1 w-full justify-start pl-10 font-normal',
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
            <div className="relative h-10 w-10 shrink-0">
                <Skeleton className="absolute h-full w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    );
};

export default NavItem;
