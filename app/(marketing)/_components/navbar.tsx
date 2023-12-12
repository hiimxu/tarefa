import Link from 'next/link';
import React from 'react';
import Logo from '~/components/logo';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const Navbar = () => {
    return (
        <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
            <div
                className={cn(
                    'mx-auto flex items-center justify-between w-full',
                    'md:max-w-screen-2xl'
                )}
            >
                <Logo />
                <div
                    className={cn(
                        'space-x-4 flex items-center justify-between w-full',
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
