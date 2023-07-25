import { FuseNavigationItem } from '@fuse/components/navigation';

export const searchEngineNavigation: FuseNavigationItem = {
    id   : 'searchEngine',
    title: 'SearchEngine',
    type : 'collapsable',
    icon : 'manage_search',
    meta : {
        permission: 'searchEngine.access',
    },
    children: [
        {
            id   : 'collections',
            title: 'Collection',
            type : 'basic',
            icon : 'mat_outline:segment',
            link : '/search-engine/collection',
            meta : {
                permission: 'searchEngine.collection.access',
            },
        },
        {
            id   : 'fields',
            title: 'Field',
            type : 'basic',
            icon : 'mat_outline:input',
            link : '/search-engine/field',
            meta : {
                permission: 'searchEngine.field.access',
            },
        },
    ],
};