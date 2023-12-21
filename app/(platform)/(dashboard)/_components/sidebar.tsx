'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';

import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { Accordion } from '~/components/ui/accordion';
import { Organization } from '~/common/types';

import NavItem, { SkeletonNavItem } from './nav-item';

type Props = {
    storageKey?: string;
};

const Sidebar: React.FC<Props> = ({ storageKey = 't-sidebar-state' }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey,
        {}
    );

    const { organization: activeOrganization, isLoaded: isLoadedOrg } =
        useOrganization();

    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
        (acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key);
            }

            return acc;
        },
        []
    );

    const onExpand = (id: string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id],
        }));
    };

    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-10 w-[50%]" />
                    <Skeleton className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                    <SkeletonNavItem />
                    <SkeletonNavItem />
                    <SkeletonNavItem />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className="pl-4">Workspaces</span>
                <Button
                    asChild
                    className="ml-auto"
                    size="icon"
                    type="button"
                    variant="ghost"
                >
                    <Link href="/select-org">
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <Accordion
                className="space-y-2"
                defaultValue={defaultAccordionValue}
                type="multiple"
            >
                {userMemberships?.data?.map(({ organization }) => (
                    <NavItem
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        key={organization.id}
                        onExpand={onExpand}
                        organization={organization as unknown as Organization}
                    />
                ))}
            </Accordion>
        </>
    );
};

Sidebar.defaultProps = {
    storageKey: 't-sidebar-state',
};

export default Sidebar;
