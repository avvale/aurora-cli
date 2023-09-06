import gql from 'graphql-tag';

export const fields = `
    {{#each (getWithoutDeletedAtProperties schema.aggregateProperties) }}
    {{#if (isAllowProperty ../schema.moduleName this) }}
    {{#unlessEq (getPropertyName this) 'id'}}
    {{ toCamelCase (getPropertyName this) }}
    {{/unlessEq}}
    {{/if}}
    {{/each}}
`;

export const relationsFields = `
    {{#each (getWebComponentsProperties schema.aggregateProperties) }}
    {{#eq webComponent.type 'select'}}
    {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Get{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }} (
        query: $query{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}
        constraint: $constraint{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}
    ) {
        {{#each (getWithoutTimestampsWithoutRelationshipProperties (getPropertiesFromPropertyRelationship this ../schema)) }}
        {{ getPropertyName this }}
        {{/each}}
    }
    {{/eq}}
    {{#eq webComponent.type 'grid-select-element'}}
    {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Paginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }} (
        query:$queryPaginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}
        constraint:$constraintPaginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}
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
{{#or (unlessEq (countGridSelectElementWebComponentsProperties schema.aggregateProperties) 0) (unlessEq (countSelectElementWebComponentsProperties schema.aggregateProperties) 0) }}

export const getRelations = gql`
    query {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Relations(
        {{#each (getWebComponentsProperties schema.aggregateProperties) }}
        {{#eq webComponent.type 'select'}}
        $query{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}: QueryStatement
        $constraint{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}: QueryStatement
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        $queryPaginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}: QueryStatement
        $constraintPaginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}: QueryStatement
        {{/eq}}
        {{/each}}
    ) {
        ${relationsFields}
    }
`;
{{/or}}

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
{{#unlessEq (countWebComponentsProperties schema.aggregateProperties) 0 }}

export const findByIdWithRelationsQuery = gql`
    query {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        {{#each (getWebComponentsProperties schema.aggregateProperties) }}
        {{#eq webComponent.type 'select'}}
        $query{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}: QueryStatement
        $constraint{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}: QueryStatement
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        $queryPaginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}: QueryStatement
        $constraintPaginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}: QueryStatement
        {{/eq}}
        {{#eq webComponent.type 'grid-elements-manager'}}
        $queryPaginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}: QueryStatement
        $constraintPaginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}: QueryStatement
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
        {{#each (getGridElementsManagerWebComponentsProperties schema.aggregateProperties) }}
        {{ toCamelCase ../schema.boundedContextName }}Paginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }} (
            query: $queryPaginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}
            constraint: $constraintPaginate{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}
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
{{#if (isArray schema.additionalApis) }}
{{#unlessEq (countAdditionalApisQueries schema.additionalApis) 0 }}

// Queries additionalApis
{{#each schema.additionalApis.queries}}
export const {{ getVariableNameAdditionalApi this }}Query = gql`
    query {{ getClassName }} (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        {{ getResolverNameAdditionalApi this }} (
            query: $query
            constraint: $constraint
        ){
            ${fields}
        }
    }
`;
{{/each}}
{{/unlessEq}}
{{/if}}
{{#if (isArray schema.additionalApis) }}
{{#unlessEq (countAdditionalApisMutations schema.additionalApis) 0 }}

// Mutation additionalApis
{{#each schema.additionalApis.mutations}}
export const {{ getVariableNameAdditionalApi this }}Mutation = gql`
    mutation {{ getClassName }} (
        $payload: {{ toPascalCase ../schema.boundedContextName }}Update{{ toPascalCase ../schema.moduleName }}ByIdInput!
        $constraint: QueryStatement
    ) {
        {{ getResolverNameAdditionalApi this }} (
            payload: $payload
            constraint: $constraint
        )
    }
`;
{{/each}}
{{/unlessEq}}
{{/if}}
