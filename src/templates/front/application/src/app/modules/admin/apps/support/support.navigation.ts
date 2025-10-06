import { FuseNavigationItem } from '@fuse/components/navigation';

export const supportNavigation: FuseNavigationItem = {
    id: 'support',
    title: 'Support',
    type: 'collapsable',
    icon: 'support',
    meta : {
        permission: 'support.access',
    },
    children: [
        {
            id: 'issues',
            title: 'Issue',
            type: 'basic',
            icon: 'bug_report',
            link: '/support/issue',
            meta : {
                permission: 'support.issue.access',
            },
        },
    ],
};