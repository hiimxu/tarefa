import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';
import { cn } from '~/lib/utils';

const headingFont = localFont({
    src: '../public/fonts/font.woff2',
});

const Logo = () => {
    return (
        <Link href="/">
            <div className={cn('hidden', 'md:flex items-center gap-x-2 ')}>
                <Image alt="Logo" height={30} src="/logo.svg" width={30} />
                <p
                    className={cn(
                        'text-lg text-neutral-700',
                        headingFont.className
                    )}
                >
                    Tarefa
                </p>
            </div>
        </Link>
    );
};

export default Logo;
