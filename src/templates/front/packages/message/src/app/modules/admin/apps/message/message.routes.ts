/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { InboxDetailComponent } from './inbox/inbox-detail.component';
import { InboxListComponent } from './inbox/inbox-list.component';
import {
    inboxEditResolver,
    inboxNewResolver,
    inboxPaginationResolver,
} from './inbox/inbox.resolvers';
import {
    MessageCenterComponent,
    MessageCenterDetailsComponent,
    MessageCenterListComponent,
    messageCenterPaginationResolver,
    messageCenterShowEmptyResolver,
    messageCenterShowResolver,
    MessageClientEmptyDetailsComponent,
} from './message-center';
import { MessageComponent } from './message.component';
import { MessageDetailComponent } from './message/message-detail.component';
import { MessageListComponent } from './message/message-list.component';
import {
    messageEditResolver,
    messageNewResolver,
    messagePaginationResolver,
} from './message/message.resolvers';

export default [
    {
        path: '',
        component: MessageComponent,
        children: [
            {
                path: 'message',
                component: MessageListComponent,
                resolve: { data: messagePaginationResolver },
                data: { permission: 'message.message.get' },
            },
            {
                path: 'message/new',
                component: MessageDetailComponent,
                resolve: { data: messageNewResolver },
                data: { permission: 'message.message.create' },
            },
            {
                path: 'message/edit/:id',
                component: MessageDetailComponent,
                resolve: { data: messageEditResolver },
                data: { permission: 'message.message.get' },
            },
            {
                path: 'inbox',
                component: InboxListComponent,
                resolve: { data: inboxPaginationResolver },
                data: { permission: 'message.inbox.get' },
            },
            {
                path: 'inbox/new',
                component: InboxDetailComponent,
                resolve: { data: inboxNewResolver },
                data: { permission: 'message.inbox.create' },
            },
            {
                path: 'inbox/edit/:id',
                component: InboxDetailComponent,
                resolve: { data: inboxEditResolver },
                data: { permission: 'message.inbox.get' },
            },
            {
                path: 'message-center',
                component: MessageCenterComponent,
                children: [
                    {
                        path: '',
                        component: MessageCenterListComponent,
                        resolve: { data: messageCenterPaginationResolver },
                        children: [
                            {
                                path: '',
                                component: MessageClientEmptyDetailsComponent,
                                resolve: {
                                    data: messageCenterShowEmptyResolver,
                                },
                            },
                            {
                                path: ':id',
                                component: MessageCenterDetailsComponent,
                                resolve: { data: messageCenterShowResolver },
                            },
                        ],
                    },
                ],
            },
        ],
        providers: [
            {
                provide: TRANSLOCO_SCOPE,
                useValue: 'message',
                multi: true,
            },
        ],
    },
];
