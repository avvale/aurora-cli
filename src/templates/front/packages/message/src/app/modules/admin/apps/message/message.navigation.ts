import { FuseNavigationItem } from '@fuse/components/navigation';

export const messageNavigation: FuseNavigationItem = {
    id      : 'message',
    title   : 'Message',
    type    : 'collapsable',
    icon    : 'inbox',
    children: [
        {
            id         : 'messages',
            title      : 'Message',
            type       : 'basic',
            iconFontSet: 'material-symbols-outlined',
            icon       : 'notification_multiple',
            link       : '/message/message',
        },
        {
            id         : 'inboxes',
            title      : 'Inbox',
            type       : 'basic',
            iconFontSet: 'material-symbols-outlined',
            icon       : 'move_to_inbox',
            link       : '/message/inbox',
        },
        {
            id         : 'messageCenter',
            title      : 'MessageCenter',
            type       : 'basic',
            iconFontSet: 'material-symbols-outlined',
            icon       : 'all_inbox',
            link       : '/message/message-center',
        },
    ],
};