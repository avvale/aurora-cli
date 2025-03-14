/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { AuditingComponent } from './auditing.component';
import { HttpCommunicationDetailComponent } from './http-communication/http-communication-detail.component';
import { HttpCommunicationListComponent } from './http-communication/http-communication-list.component';
import { httpCommunicationEditResolver, httpCommunicationNewResolver, httpCommunicationPaginationResolver } from './http-communication/http-communication.resolvers';
import { SideEffectDetailComponent } from './side-effect/side-effect-detail.component';
import { SideEffectListComponent } from './side-effect/side-effect-list.component';
import { sideEffectEditResolver, sideEffectNewResolver, sideEffectPaginationResolver } from './side-effect/side-effect.resolvers';

export default [
    {
        path     : '',
        component: AuditingComponent,
        children : [
            { path: 'side-effect', component: SideEffectListComponent, resolve: { data: sideEffectPaginationResolver }, data: { permission: 'auditing.sideEffect.get' }},
            { path: 'side-effect/new', component: SideEffectDetailComponent, resolve: { data: sideEffectNewResolver }, data: { permission: 'auditing.sideEffect.create' }},
            { path: 'side-effect/edit/:id', component: SideEffectDetailComponent, resolve: { data: sideEffectEditResolver }, data: { permission: 'auditing.sideEffect.get' }},
            { path: 'http-communication', component: HttpCommunicationListComponent, resolve: { data: httpCommunicationPaginationResolver }, data: { permission: 'auditing.httpCommunication.get' }},
            { path: 'http-communication/new', component: HttpCommunicationDetailComponent, resolve: { data: httpCommunicationNewResolver }, data: { permission: 'auditing.httpCommunication.create' }},
            { path: 'http-communication/edit/:id', component: HttpCommunicationDetailComponent, resolve: { data: httpCommunicationEditResolver }, data: { permission: 'auditing.httpCommunication.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'auditing',
                multi   : true,
            },
        ],
    },
];
