import React from 'react';
import { cn } from '~/lib/utils';
import Sidebar from '../_components/sidebar';

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main
            className={cn(
                'pt-20 px-4 max-w-6xl',
                'md:pt-24',
                '2xl:max-w-screen-xl'
            )}
        >
            <div className="flex gap-x-7">
                <div className={cn('w-64 shrink-0 hidden', 'md:block')}>
                    <Sidebar />
                </div>
                {children}
            </div>
        </main>
    );
};

export default OrganizationLayout;
