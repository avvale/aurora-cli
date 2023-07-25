/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { JobRegistryDetailComponent } from './job-registry/job-registry-detail.component';
import { JobRegistryListComponent } from './job-registry/job-registry-list.component';
import { jobRegistryEditResolver, jobRegistryNewResolver, jobRegistryPaginationResolver } from './job-registry/job-registry.resolvers';
import { QueueManagerComponent } from './queue-manager.component';
import { QueueDetailComponent } from './queue/queue-detail.component';
import { QueueListComponent } from './queue/queue-list.component';
import { queueEditResolver, queueNewResolver, queuePaginationResolver } from './queue/queue.resolvers';

export default [
    {
        path     : '',
        component: QueueManagerComponent,
        children : [
            { path: 'queue', component: QueueListComponent, resolve: { data: queuePaginationResolver }, data: { permission: 'queueManager.queue.get' }},
            { path: 'queue/new', component: QueueDetailComponent, resolve: { data: queueNewResolver }, data: { permission: 'queueManager.queue.create' }},
            { path: 'queue/edit/:id', component: QueueDetailComponent, resolve: { data: queueEditResolver }, data: { permission: 'queueManager.queue.get' }},
            { path: 'job-registry', component: JobRegistryListComponent, resolve: { data: jobRegistryPaginationResolver }, data: { permission: 'queueManager.jobRegistry.get' }},
            { path: 'job-registry/new', component: JobRegistryDetailComponent, resolve: { data: jobRegistryNewResolver }, data: { permission: 'queueManager.jobRegistry.create' }},
            { path: 'job-registry/edit/:id', component: JobRegistryDetailComponent, resolve: { data: jobRegistryEditResolver }, data: { permission: 'queueManager.jobRegistry.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'queue-manager',
                multi   : true,
            },
        ],
    },
];
