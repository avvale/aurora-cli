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
            icon : 'mat_outline:language',
            link : '/common/lang',
            meta : {
                permission: 'common.lang.access',
            },
        },
        {
            id   : 'countries',
            title: 'Country',
            type : 'basic',
            icon : 'mat_outline:flag',
            link : '/common/country',
            meta : {
                permission: 'common.country.access',
            },
        },
        {
            id   : 'administrativeAreasLevel1',
            title: 'AdministrativeAreaLevel1',
            type : 'basic',
            icon : 'mat_outline:share_location',
            link : '/common/administrative-area-level-1',
            meta : {
                permission: 'common.administrativeAreaLevel1.access',
            },
        },
        {
            id   : 'administrativeAreasLevel2',
            title: 'AdministrativeAreaLevel2',
            type : 'basic',
            icon : 'mat_outline:share_location',
            link : '/common/administrative-area-level-2',
        },
        {
            id   : 'administrativeAreasLevel3',
            title: 'AdministrativeAreaLevel3',
            type : 'basic',
            icon : 'mat_outline:share_location',
            link : '/common/administrative-area-level-3',
        },
    ],
};