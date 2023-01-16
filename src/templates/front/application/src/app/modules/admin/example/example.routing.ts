/* eslint-disable max-len */
import { Route } from '@angular/router';
import { ExampleDetailComponent } from './example-section/example-detail.component';
import { ExampleDetailResolver } from './example-section/example-section.resolvers';
import { ExampleComponent } from './example.component';

export const exampleRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'example-section',
    },
    {
        path     : '',
        component: ExampleComponent,
        children : [
            {
                path     : 'example-section',
                component: ExampleDetailComponent,
                resolve  : { data: ExampleDetailResolver },
                data     : { permission: undefined },
            },
        ],
    },
];
