import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import { Medal } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';

const textFont = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const headingFont = localFont({
    src: '../../public/fonts/font.woff2',
});

const MarketingPage: NextPage = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div
                className={cn(
                    'flex flex-col items-center justify-center',
                    headingFont.className
                )}
            >
                <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
                    <Medal className="h-6 w-6 mr-2" />
                    No 1 task management
                </div>
                <h1
                    className={cn(
                        'text-3xl text-center text-neutral-800 mb-6',
                        'md:text-6xl'
                    )}
                >
                    Tarefa helps team move
                </h1>
                <div
                    className={cn(
                        'text-3xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white p-3 px-4 pb-2 rounded-md w-fit',
                        'md:text-6xl'
                    )}
                >
                    work forward.
                </div>
            </div>
            <div
                className={cn(
                    'text-sm text-neutral-400 mt-4 max-w-xs text-center mx-auto',
                    'md:text-xl md:max-w-2xl',
                    textFont.className
                )}
            >
                Collaborate, manage projects, and reach new productivity peaks.
                From high rises to the home office, the way your team works is
                unique - accomplish it all with Tarefa.
            </div>
            <Button asChild className="mt-6" size="lg">
                <Link href="/sign-up">Get Taskify for free</Link>
            </Button>
        </div>
    );
};

export default MarketingPage;
