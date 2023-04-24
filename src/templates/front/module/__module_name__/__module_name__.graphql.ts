import gql from 'graphql-tag';

export const fields = `
    {{#each schema.properties.withoutDeletedAt}}
    {{#if (isAllowProperty ../schema.moduleName this) }}
    {{#unlessEq name 'id'}}
    {{ toCamelCase name }}
    {{/unlessEq}}
    {{/if}}
    {{/each}}
`;

export const relationsFields = `
    {{#each schema.properties.withWebComponents}}
    {{#eq webComponent.type 'select'}}
    {{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipSchema.moduleNames }} (
        query: $query{{ toPascalCase getRelationshipSchema.moduleNames }}
        constraint: $constraint{{ toPascalCase getRelationshipSchema.moduleNames }}
    ) {
        {{#each getRelationshipProperties.withoutTimestampsWithoutRelationship}}
        {{ name }}
        {{/each}}
    }
    {{/eq}}
    {{#eq webComponent.type 'grid-select-element'}}
    {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipSchema.moduleNames }} (
        query:$queryPaginate{{ toPascalCase getRelationshipSchema.moduleNames }}
        constraint:$constraintPaginate{{ toPascalCase getRelationshipSchema.moduleNames }}
    ) {
        total
        rows
        count
    }
    {{/eq}}
    {{/each}}
`;

// default methods
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
            id
            #FIELDS
        }
    }
`;
{{#and (unlessEq schema.properties.lengthGridSelectElementWebComponents 0) (unlessEq schema.properties.lengthSelectElementWebComponents 0) }}

export const getRelations = gql`
    query {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Relations(
        {{#each schema.properties.withWebComponents}}
        {{#eq webComponent.type 'select'}}
        $query{{ toPascalCase getRelationshipSchema.moduleNames }}: QueryStatement
        $constraint{{ toPascalCase getRelationshipSchema.moduleNames }}: QueryStatement
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        $queryPaginate{{ toPascalCase getRelationshipSchema.moduleNames }}: QueryStatement
        $constraintPaginate{{ toPascalCase getRelationshipSchema.moduleNames }}: QueryStatement
        {{/eq}}
        {{/each}}
    ) {
        ${relationsFields}
    }
`;
{{/and}}

export const findByIdQuery = gql`
    query {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;
{{#unlessEq schema.properties.lengthWebComponents 0 }}

export const findByIdWithRelationsQuery = gql`
    query {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        {{#each schema.properties.withWebComponents}}
        {{#eq webComponent.type 'select'}}
        $query{{ toPascalCase getRelationshipSchema.moduleNames }}: QueryStatement
        $constraint{{ toPascalCase getRelationshipSchema.moduleNames }}: QueryStatement
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        $queryPaginate{{ toPascalCase getRelationshipSchema.moduleNames }}: QueryStatement
        $constraintPaginate{{ toPascalCase getRelationshipSchema.moduleNames }}: QueryStatement
        {{/eq}}
        {{#eq webComponent.type 'grid-elements-manager'}}
        $queryPaginate{{ toPascalCase getRelationshipSchema.moduleNames }}: QueryStatement
        $constraintPaginate{{ toPascalCase getRelationshipSchema.moduleNames }}: QueryStatement
        {{/eq}}
        {{/each}}
    ) {
        object: {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
        {{#each schema.properties.withGridElementsManagerWebComponents}}
        {{ toCamelCase ../schema.boundedContextName }}Paginate{{ toPascalCase getRelationshipSchema.moduleNames }} (
            query: $queryPaginate{{ toPascalCase getRelationshipSchema.moduleNames }}
            constraint: $constraintPaginate{{ toPascalCase getRelationshipSchema.moduleNames }}
        ) {
            total
            rows
            count
        }
        {{/each}}
        ${relationsFields}
    }
`;
{{/unlessEq}}

export const findQuery = gql`
    query {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }} (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }} (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
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
