import React from 'react';
import { startCase } from 'lodash';
import { auth } from '@clerk/nextjs';
import OrgControl from './_components/org-control';

export const generateMetadata = async () => {
    const { orgSlug } = auth();

    return {
        title: startCase(orgSlug || 'organization'),
    };
};

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <OrgControl />
            {children}
        </>
    );
};

export default OrganizationIdLayout;
