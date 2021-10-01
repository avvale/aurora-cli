import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
{{#each schema.properties.withRelationshipOneToOne}}
import { {{ relationshipAggregate }}Model } from '@hades/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model';
{{/each}}
{{#each schema.properties.withRelationshipManyToOne}}
import { {{ relationshipAggregate }}Model } from '@hades/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model';
{{/each}}
{{#each schema.properties.withRelationshipOneToMany}}
import { {{ relationshipAggregate }}Model } from '@hades/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model';
{{/each}}
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ relationshipAggregate }}Model } from '@hades/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model';
import { {{ intermediateModel }} } from '@hades/{{ intermediateModelModuleSection }}/infrastructure/sequelize/sequelize-{{ intermediateModelFile }}.model';
{{/each}}

@Table({ modelName: '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}', freezeTableName: true, timestamps: false })
export class {{ schema.aggregateName }}Model extends Model<{{ schema.aggregateName }}Model>
{
    {{#each schema.properties.modelColumns}}
    {{#if hasColumnDecorator }}
    {{#eq relationship ../relationship.ONE_TO_ONE }}
    @ForeignKey(() => {{ relationshipAggregate }}Model)
    {{/eq}}
    {{#eq relationship ../relationship.MANY_TO_ONE }}
    @ForeignKey(() => {{ relationshipAggregate }}Model)
    {{/eq}}
    {{#eq index 'index' }}
    {{! @Index :: https://github.com/RobinBuschmann/sequelize-typescript/issues/725 }}
    @Index
    {{/eq}}
    {{#eq index 'unique' }}
    @Unique
    {{/eq}}
    @Column({
        field: '{{ toCamelCase name }}',
        {{#if primaryKey }}
        primaryKey: {{ primaryKey }},
        {{/if}}
        allowNull: {{ nullable }},
        type: {{{ getSequelizeType }}},
        {{#if defaultValue }}
        defaultValue: {{ getDefaultValue }},
        {{/if}}
        {{#eq relationship ../relationship.MANY_TO_ONE }}
        references: {
            key: '{{ getReferenceKey }}'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        {{/eq}}
    })
    {{ toCamelCase name }}: {{{ getJavascriptType }}};
    {{/if}}
    {{#if hasHasOneDecorator }}

    @HasOne(() => {{ relationshipAggregate }}Model)
    {{ toCamelCase name }}: {{ relationshipAggregate }}Model;
    {{/if}}
    {{#if hasBelongsToDecorator }}

    @BelongsTo(() => {{ relationshipAggregate }}Model)
    {{ toCamelCase relationshipField }}: {{ relationshipAggregate }}Model;
    {{/if}}
    {{#if hasHasManyDecorator }}

    @HasMany(() => {{ relationshipAggregate }}Model{{#if relationshipKey }}, '{{ relationshipKey }}'{{/if}})
    {{ toCamelCase name }}: {{ relationshipAggregate }}Model[];
    {{/if}}
    {{#if hasBelongsToManyDecorator }}

    {{#if intermediateTable }}
    @BelongsToMany(() => {{ relationshipAggregate }}Model, { through: () => {{ intermediateModel }}, uniqueKey: 'Uq01{{ toPascalCase intermediateTable }}' })
    {{ toCamelCase nativeName }}: {{ relationshipAggregate }}Model[];
    {{else}}
    @BelongsToMany(() => {{ relationshipAggregate }}Model, () => {{ intermediateModel }})
    {{ toCamelCase nativeName }}: {{ relationshipAggregate }}Model[];
    {{/if}}
    {{/if}}

    {{/each}}
}