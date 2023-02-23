import { FuseNavigationItem } from '@fuse/components/navigation';

export const auditingNavigation: FuseNavigationItem = {
    id   : 'auditing',
    title: 'Auditing',
    type : 'collapsable',
    icon : 'approval',
    meta : {
        permission: 'auditing.access',
    },
    children: [
        {
            id   : 'sideEffects',
            title: 'SideEffect',
            type : 'basic',
            icon : 'app_registration',
            link : '/auditing/side-effect',
            meta : {
                permission: 'auditing.sideEffect.access',
            },
        },
        {
            id   : 'httpCommunications',
            title: 'HttpCommunication',
            type : 'basic',
            icon : 'http',
            link : '/auditing/http-communication',
            meta : {
                permission: 'auditing.httpCommunication.access',
            },
        },
    ],
};