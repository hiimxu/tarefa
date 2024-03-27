import Link from 'next/link';
import React from 'react';
import Logo from '~/components/logo';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const Navbar = () => {
    return (
        <div className="fixed top-0 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
            <div
                className={cn(
                    'mx-auto flex w-full items-center justify-between',
                    'md:max-w-screen-2xl'
                )}
            >
                <Logo />
                <div
                    className={cn(
                        'flex w-full items-center justify-between space-x-4',
                        'md:block md:w-auto'
                    )}
                >
                    <Button asChild size="sm" variant="outline">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                    <Button asChild size="sm">
                        <Link href="/sign-up">Get Tarefa for free</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
