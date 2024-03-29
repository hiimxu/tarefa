'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Dialog, DialogContent } from '~/components/ui/dialog';
import { useCardModal } from '~/hooks/use-card-modal';
import { fetcher } from '~/lib/fetcher';
import { CardWithList } from '~/type';
import { AuditLog } from '@prisma/client';
import { Header } from './header';
import { Description } from './description';
import { Actions } from './actions';
import { Activity } from './activity';

export const CardModal = () => {
    const { id, isOpen, onClose } = useCardModal();

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ['card', id],
        queryFn: () => fetcher(`/api/cards/${id}`),
        enabled: Boolean(id),
    });

    const { data: auditLogsData } = useQuery<AuditLog[]>({
        queryKey: ['card-logs', id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`),
    });

    return (
        <Dialog onOpenChange={onClose} open={isOpen}>
            <DialogContent>
                {!cardData?.title ? (
                    <Header.Skeleton />
                ) : (
                    <Header data={cardData} />
                )}
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            {!cardData ? (
                                <Description.Skeleton />
                            ) : (
                                <Description data={cardData} />
                            )}
                            {!auditLogsData ? (
                                <Activity.Skeleton />
                            ) : (
                                <Activity items={auditLogsData} />
                            )}
                        </div>
                    </div>
                    {!cardData ? (
                        <Actions.Skeleton />
                    ) : (
                        <Actions data={cardData} />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
