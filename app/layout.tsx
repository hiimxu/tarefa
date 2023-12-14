import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '~/config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: SITE_CONFIG.name,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    icons: [
        {
            url: '/logo.svg',
            href: '/logo.svg',
        },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
