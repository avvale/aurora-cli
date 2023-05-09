import { FuseNavigationItem } from '@fuse/components/navigation';

export const queueManagerNavigation: FuseNavigationItem = {
    id   : 'queueManager',
    title: 'QueueManager',
    type : 'collapsable',
    icon : 'rule',
    meta : {
        permission: 'queueManager.access',
    },
    children: [
        {
            id         : 'queues',
            title      : 'Queue',
            type       : 'basic',
            iconFontSet: 'material-symbols-outlined',
            icon       : 'chat_paste_go',
            link       : '/queue-manager/queue',
            meta       : {
                permission: 'queueManager.queue.access',
            },
        },
        {
            id   : 'jobsRegistry',
            title: 'JobRegistry',
            type : 'basic',
            icon : 'engineering',
            link : '/queue-manager/job-registry',
        },
    ],
};