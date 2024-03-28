import React from 'react';
import { cn } from '~/lib/utils';
import Sidebar from '../_components/sidebar';

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main
            className={cn(
                'max-w-6xl px-4 pt-20',
                'md:pt-24',
                '2xl:max-w-screen-xl'
            )}
        >
            <div className="flex gap-x-7">
                <div className={cn('hidden w-64 shrink-0', 'md:block')}>
                    <Sidebar />
                </div>
                {children}
            </div>
        </main>
    );
};

export default OrganizationLayout;
