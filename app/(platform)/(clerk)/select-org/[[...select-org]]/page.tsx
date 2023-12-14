import { OrganizationList } from '@clerk/nextjs';

export default function CreateOrganizationPage() {
    return (
        <OrganizationList
            afterCreateOrganizationUrl="/organization/:id"
            afterSelectOrganizationUrl="/organization/:id"
            hidePersonal
        />
    );
}
