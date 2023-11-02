import { FuseNavigationItem } from '@fuse/components/navigation';

export const iamNavigation: FuseNavigationItem = {
    id   : 'iam',
    title: 'Iam',
    type : 'collapsable',
    icon : 'mat_outline:admin_panel_settings',
    meta : {
        permission: 'iam.access',
    },
    children: [
        {
            id   : 'accounts',
            title: 'Account',
            type : 'basic',
            icon : 'mat_outline:manage_accounts',
            link : '/iam/account',
            meta : {
                permission: 'iam.account.access',
            },
        },
        {
            id   : 'roles',
            title: 'Role',
            type : 'basic',
            icon : 'mat_outline:groups',
            link : '/iam/role',
            meta : {
                permission: 'iam.role.access',
            },
        },
        {
            id   : 'boundedContexts',
            title: 'BoundedContext',
            type : 'basic',
            icon : 'mat_outline:extension',
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
        {
            id   : 'permissions',
            title: 'Permission',
            type : 'basic',
            icon : 'mat_outline:local_police',
            link : '/iam/permission',
        },
    ],
};