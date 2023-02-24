import { FuseNavigationItem } from '@fuse/components/navigation';

export const iamNavigation: FuseNavigationItem = {
    id   : 'iam',
    title: 'Iam',
    type : 'collapsable',
    icon : 'security',
    meta : {
        permission: 'iam.access',
    },
    children: [
        {
            id   : 'accounts',
            title: 'Account',
            type : 'basic',
            icon : 'manage_accounts',
            link : '/iam/account',
            meta : {
                permission: 'iam.account.access',
            },
        },
        {
            id   : 'roles',
            title: 'Role',
            type : 'basic',
            icon : 'groups',
            link : '/iam/role',
            meta : {
                permission: 'iam.role.access',
            },
        },
        {
            id   : 'boundedContexts',
            title: 'BoundedContext',
            type : 'basic',
            icon : 'extension',
            link : '/iam/bounded-context',
            meta : {
                permission: 'iam.boundedContext.access',
            },
        },
        {
            id         : 'tenants',
            title      : 'Tenant',
            type       : 'basic',
            iconFontSet: 'material-symbols-outlined',
            icon       : 'tenancy',
            link       : '/iam/tenant',
            meta       : {
                permission: 'iam.tenant.access',
            },
        },
    ],
};