'use client';

import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useMobileSidebar } from '~/hooks/use-mobile-sidebar';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent } from '~/components/ui/sheet';

import Sidebar from './sidebar';

const MobileSidebar = () => {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const { isOpen, onClose, onOpen } = useMobileSidebar();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    if (!isMounted) {
        return null;
    }
    return (
        <>
            <Button
                className="block md:hidden mr-2"
                onClick={onOpen}
                size="sm"
                variant="ghost"
            >
                <Menu className="h-4 w-4" />
            </Button>
            <Sheet onOpenChange={onClose} open={isOpen}>
                <SheetContent className="p-2 pt-10" side="left">
                    <Sidebar storageKey="t-sidebar-mobile-state" />
                </SheetContent>
            </Sheet>
        </>
    );
};

export default MobileSidebar;
