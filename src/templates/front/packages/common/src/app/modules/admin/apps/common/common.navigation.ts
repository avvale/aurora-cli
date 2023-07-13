import { FuseNavigationItem } from '@fuse/components/navigation';

export const commonNavigation: FuseNavigationItem = {
    id         : 'common',
    title      : 'Common',
    type       : 'collapsable',
    iconFontSet: 'material-symbols-outlined',
    icon       : 'interests',
    meta       : {
        permission: 'common.access',
    },
    children: [
        {
            id   : 'langs',
            title: 'Lang',
            type : 'basic',
            icon : 'language',
            link : '/common/lang',
            meta : {
                permission: 'common.lang.access',
            },
        },
        {
            id   : 'countries',
            title: 'Country',
            type : 'basic',
            icon : 'flag',
            link : '/common/country',
            meta : {
                permission: 'common.country.access',
            },
        },
    ],
};