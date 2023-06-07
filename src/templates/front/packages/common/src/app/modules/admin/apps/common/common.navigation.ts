import { FuseNavigationItem } from '@fuse/components/navigation';

export const commonNavigation: FuseNavigationItem = {
    id         : 'common',
    title      : 'Common',
    type       : 'collapsable',
    iconFontSet: 'material-symbols-outlined',
    icon       : 'interests',
    children   : [
        {
            id   : 'langs',
            title: 'Lang',
            type : 'basic',
            icon : 'language',
            link : '/common/lang',
        },
        {
            id   : 'countries',
            title: 'Country',
            type : 'basic',
            icon : 'flag',
            link : '/common/country',
        },
    ],
};