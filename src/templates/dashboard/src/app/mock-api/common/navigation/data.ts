/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'applications',
        title   : 'Applications',
        subtitle: 'Applications installed',
        type    : 'group',
        children: [
            {
                id      : 'admin',
                title   : 'Admin',
                type    : 'collapsable',
                icon    : 'heroicons_outline:cog',
                children: [
                    {
                        id   : 'example',
                        title: 'Example',
                        type : 'basic',
                        icon : 'heroicons_outline:chart-pie',
                        link : '/example',
                    },
                ],
            },
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example',
    },
];
