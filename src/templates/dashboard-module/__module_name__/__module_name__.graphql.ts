import gql from 'graphql-tag';
import { GraphQLStatements } from '@aurora';

const fields = `
    {{#each schema.properties.withoutDeletedAt}}
    {{#if (allowProperty ../schema.moduleName this) }}
    {{ toCamelCase name }}
    {{/if}}
    {{/each}}
`;

const relationsFields = '';

export const graphQL: GraphQLStatements = {
    fields,
    relationsFields,

    queryPagination: gql`
        query {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }} ($query:QueryStatement $constraint:QueryStatement) {
            pagination: {{ toCamelCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }} (query:$query constraint:$constraint) {
                total
                rows
                count
            }
        }
    `,

    queryObjectRelations: null,

    queryObjects: gql`
        query {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }} ($query:QueryStatement $constraint:QueryStatement) {
            objects: {{ toCamelCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }} (query:$query constraint:$constraint) {
                ${fields}
            }
            ${relationsFields}
        }
    `,

    queryObject: gql`
        query {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }} ($query:QueryStatement $constraint:QueryStatement) {
            object: {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }} (query:$query constraint:$constraint) {
                ${fields}
            }
            ${relationsFields}
        }
    `,

    mutationCreateObject: gql`
        mutation {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }} ($payload:{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input!) {
            {{ toCamelCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }} (payload:$payload) {
                ${fields}
            }
        }
    `,

    mutationUpdateObject: gql`
        mutation {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }} ($payload:{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Input!) {
            {{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }} (payload:$payload) {
                ${fields}
            }
        }
    `,

    mutationDeleteObjectById: gql`
        mutation {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ById ($id:ID!) {
            {{ toCamelCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ById (id:$id) {
                ${fields}
            }
        }
    `,
};
