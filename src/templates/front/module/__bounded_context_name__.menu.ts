import { FuseNavigationItem } from '@fuse/components/navigation';

export const {{ toCamelCase schema.boundedContextName }}Menu: FuseNavigationItem = {
    id      : '{{ toCamelCase schema.boundedContextName }}',
    title   : '{{ toPascalCase schema.boundedContextName }}',
    type    : 'collapsable',
    icon    : 'heroicons_outline:tag',
    children: [],
};