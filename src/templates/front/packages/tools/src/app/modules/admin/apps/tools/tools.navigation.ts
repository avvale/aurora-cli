import { FuseNavigationItem } from '@fuse/components/navigation';

export const toolsNavigation: FuseNavigationItem = {
    id      : 'tools',
    title   : 'Tools',
    type    : 'collapsable',
    icon    : 'mat_outline:construction',
    meta : {
        permission: 'tools.access',
    },
    children: [
        {
            id: 'keyValues',
            title: 'KeyValue',
            type: 'basic',
            iconFontSet: 'material-symbols-outlined',
            icon: 'data_object',
            link: '/tools/key-value',
            meta: {
                permission: 'tools.keyValue.access',
            },
        },
        {
            id: 'procedures',
            title: 'Procedure',
            type: 'basic',
            iconFontSet: 'material-symbols-outlined',
            icon: 'flowsheet',
            link: '/tools/procedure',
            meta: {
                permission: 'tools.procedure.access',
            },
        },
        {
            id: 'migrations',
            title: 'Migration',
            type: 'basic',
            iconFontSet: 'material-symbols-outlined',
            icon: 'repartition',
            link: '/tools/migration',
            meta : {
                permission: 'tools.migration.access',
            },
        },
    ],
};