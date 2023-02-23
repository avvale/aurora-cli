/* eslint-disable max-len */
import { Route } from '@angular/router';
import { AuditingComponent } from './auditing.component';
import { SideEffectListComponent } from './side-effect/side-effect-list.component';
import { SideEffectDetailComponent } from './side-effect/side-effect-detail.component';
import { SideEffectEditResolver, SideEffectNewResolver, SideEffectPaginationResolver } from './side-effect/side-effect.resolvers';
import { HttpCommunicationListComponent } from './http-communication/http-communication-list.component';
import { HttpCommunicationDetailComponent } from './http-communication/http-communication-detail.component';
import { HttpCommunicationEditResolver, HttpCommunicationNewResolver, HttpCommunicationPaginationResolver } from './http-communication/http-communication.resolvers';

export const auditingRoutes: Route[] = [
    {
        path     : '',
        component: AuditingComponent,
        children : [
            { path: 'side-effect', component: SideEffectListComponent, resolve: { data: SideEffectPaginationResolver }, data: { permission: 'auditing.sideEffect.get' }},
            { path: 'side-effect/new', component: SideEffectDetailComponent, resolve: { data: SideEffectNewResolver }, data: { permission: 'auditing.sideEffect.create' }},
            { path: 'side-effect/edit/:id', component: SideEffectDetailComponent, resolve: { data: SideEffectEditResolver }, data: { permission: 'auditing.sideEffect.get' }},
            { path: 'http-communication', component: HttpCommunicationListComponent, resolve: { data: HttpCommunicationPaginationResolver }, data: { permission: 'auditing.httpCommunication.get' }},
            { path: 'http-communication/new', component: HttpCommunicationDetailComponent, resolve: { data: HttpCommunicationNewResolver }, data: { permission: 'auditing.httpCommunication.create' }},
            { path: 'http-communication/edit/:id', component: HttpCommunicationDetailComponent, resolve: { data: HttpCommunicationEditResolver }, data: { permission: 'auditing.httpCommunication.get' }},
        ],
    },
];
