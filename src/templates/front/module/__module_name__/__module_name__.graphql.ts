import gql from 'graphql-tag';

export const fields = `
    {{#each schema.properties.withoutDeletedAt}}
    {{#if (allowProperty ../schema.moduleName this) }}
    {{ toCamelCase name }}
    {{/if}}
    {{/each}}
`;

export const relationsFields = '';

export const paginationQuery = gql`
    query {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }} (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: {{ toCamelCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }} (
            query: $query
            constraint: $constraint
        ) {
            total
            rows
            count
        }
    }
`;

export const getQuery = gql`
    query {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }} (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: {{ toCamelCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }} (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }} (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }} (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
        ${relationsFields}
    }
`;

export const createMutation = gql`
    mutation {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }} (
        $payload: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input!
    ) {
        {{ toCamelCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }} (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ById (
        $payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput!
        $constraint: QueryStatement
    ) {
        {{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }} (
        $payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Input!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        {{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }} (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        {{ toCamelCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }} (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        {{ toCamelCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }} (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
{{#unlessEq schema.additionalApis.lengthQueries 0 }}

// Queries additionalApis
{{#each schema.additionalApis.queries}}
export const {{ getVariableName }}Query = gql`
    query {{ getClassName }} (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        {{ getResolverName }} (
            query: $query
            constraint: $constraint
        ){
            ${fields}
        }
    }
`;
{{/each}}
{{/unlessEq}}
{{#unlessEq schema.additionalApis.lengthMutations 0 }}

// Mutation additionalApis
{{#each schema.additionalApis.mutations}}
export const {{ getVariableName }}Mutation = gql`
    mutation {{ getClassName }} (
        $payload: {{ toPascalCase ../schema.boundedContextName }}Update{{ toPascalCase ../schema.moduleName }}ByIdInput!
        $constraint: QueryStatement
    ) {
        {{ getResolverName }} (
            payload: $payload
            constraint: $constraint
        )
    }
`;
{{/each}}
{{/unlessEq}}
