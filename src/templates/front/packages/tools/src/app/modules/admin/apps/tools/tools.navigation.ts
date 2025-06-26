import { FuseNavigationItem } from '@fuse/components/navigation';

export const toolsNavigation: FuseNavigationItem = {
    id      : 'tools',
    title   : 'Tools',
    type    : 'collapsable',
    icon    : 'mat_outline:construction',
    children: [
        {
            id         : 'keyValues',
            title      : 'KeyValue',
            type       : 'basic',
            iconFontSet: 'material-symbols-outlined',
            icon       : 'data_object',
            link       : '/tools/key-value',
        },
        {
            id         : 'procedures',
            title      : 'Procedure',
            type       : 'basic',
            iconFontSet: 'material-symbols-outlined',
            icon       : 'flowsheet',
            link       : '/tools/procedure',
        },
    ],
};