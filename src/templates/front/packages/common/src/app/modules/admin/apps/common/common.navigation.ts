import { FuseNavigationItem } from '@fuse/components/navigation';

export const commonNavigation: FuseNavigationItem = {
    id      : 'common',
    title   : 'Common',
    type    : 'collapsable',
    icon    : 'heroicons_outline:tag',
    children: [
        {
            id   : 'langs',
            title: 'Lang',
            type : 'basic',
            icon : 'heroicons_outline:tag',
            link : '/common/lang',
        },
    ],
};