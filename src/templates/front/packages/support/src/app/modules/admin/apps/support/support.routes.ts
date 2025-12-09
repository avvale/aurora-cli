/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { ConfigDetailComponent } from './config/config-detail.component';
import { configEditResolver } from './config/config.resolvers';
import { IssueDetailComponent } from './issue/issue-detail.component';
import { IssueListComponent } from './issue/issue-list.component';
import {
    issueEditResolver,
    issueNewResolver,
    issuePaginationResolver,
} from './issue/issue.resolvers';
import { SupportComponent } from './support.component';
import { CommentListComponent } from './comment/comment-list.component';
import { CommentDetailComponent } from './comment/comment-detail.component';
import { commentEditResolver, commentNewResolver, commentPaginationResolver } from './comment/comment.resolvers';

export default [
    {
        path: '',
        component: SupportComponent,
        children: [
            {
                path: 'issue',
                component: IssueListComponent,
                resolve: { data: issuePaginationResolver },
                data: { permission: 'support.issue.get' },
            },
            {
                path: 'issue/new',
                component: IssueDetailComponent,
                resolve: { data: issueNewResolver },
                data: { permission: 'support.issue.create' },
            },
            {
                path: 'issue/edit/:id',
                component: IssueDetailComponent,
                resolve: { data: issueEditResolver },
                data: { permission: 'support.issue.get' },
            },
            {
                path: 'config',
                component: ConfigDetailComponent,
                resolve: { data: configEditResolver },
                data: { permission: 'support.config.get' },
            },
            { path: 'comment', component: CommentListComponent, resolve: { data: commentPaginationResolver }, data: { permission: 'support.comment.get' }},
            { path: 'comment/new', component: CommentDetailComponent, resolve: { data: commentNewResolver }, data: { permission: 'support.comment.create' }},
            { path: 'comment/edit/:id', component: CommentDetailComponent, resolve: { data: commentEditResolver }, data: { permission: 'support.comment.get' }},
        ],
        providers: [
            {
                provide: TRANSLOCO_SCOPE,
                useValue: 'support',
                multi: true,
            },
        ],
    },
];
