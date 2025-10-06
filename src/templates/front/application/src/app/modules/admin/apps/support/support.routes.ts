/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { SupportComponent } from './support.component';
import { IssueListComponent } from './issue/issue-list.component';
import { IssueDetailComponent } from './issue/issue-detail.component';
import { issueEditResolver, issueNewResolver, issuePaginationResolver } from './issue/issue.resolvers';

export default [
    {
        path     : '',
        component: SupportComponent,
        children : [
            { path: 'issue', component: IssueListComponent, resolve: { data: issuePaginationResolver }, data: { permission: 'support.issue.get' }},
            { path: 'issue/new', component: IssueDetailComponent, resolve: { data: issueNewResolver }, data: { permission: 'support.issue.create' }},
            { path: 'issue/edit/:id', component: IssueDetailComponent, resolve: { data: issueEditResolver }, data: { permission: 'support.issue.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'support',
                multi   : true,
            },
        ],
    },
];
