import { Plus } from 'lucide-react';
import React from 'react';
import Logo from '~/components/logo';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';

const Navbar = () => {
    return (
        <nav className="fixed z-50 top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
            <div className="flex items-center gap-x-4">
                <div className={cn('hidden', 'md:flex')}>
                    <Logo />
                </div>
                <Button
                    className={cn(
                        'rounded-sm hidden h-auto py-1.5 px-2',
                        'md:block'
                    )}
                    size="sm"
                    variant="primary"
                >
                    Create
                </Button>
                <Button
                    className={cn('rounded-sm block', 'md:hidden')}
                    size="sm"
                    variant="primary"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/organization/:id"
                    afterLeaveOrganizationUrl="/select-org"
                    afterSelectOrganizationUrl="/organization/:id"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        },
                    }}
                    hidePersonal
                />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30,
                            },
                        },
                    }}
                />
            </div>
        </nav>
    );
};

export default Navbar;
