/* eslint-disable max-len */
import { Route } from '@angular/router';
import { {{ toPascalCase schema.boundedContextName }}Component } from './{{ toKebabCase schema.boundedContextName }}.component';

export const {{ toCamelCase schema.boundedContextName }}Routes: Route[] = [
    {
        path     : '',
        component: {{ toPascalCase schema.boundedContextName }}Component,
        children : [],
    },
];
