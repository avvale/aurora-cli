/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { {{ toPascalCase schema.boundedContextName }}Component } from './{{ toKebabCase schema.boundedContextName }}.component';

export default [
    {
        path     : '',
        component: {{ toPascalCase schema.boundedContextName }}Component,
        children : [],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: '{{ toKebabCase schema.boundedContextName }}',
                multi   : true,
            },
        ],
    },
];
