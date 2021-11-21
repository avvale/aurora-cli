/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
{{#each schema.propertiesI18n.withRelationshipOneToOne}}
import { {{ relationshipAggregate }}Model } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model';
{{/each}}
{{#each schema.propertiesI18n.withRelationshipManyToOne}}
import { {{ relationshipAggregate }}Model } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model';
{{/each}}
{{#each schema.propertiesI18n.withRelationshipOneToMany}}
import { {{ relationshipAggregate }}Model } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model';
{{/each}}
{{#each schema.propertiesI18n.withRelationshipManyToMany}}
import { {{ relationshipAggregate }}Model } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model';
import { {{ intermediateModel }} } from '{{ config.applicationsContainer }}/{{ intermediateModelModuleSection }}/infrastructure/sequelize/sequelize-{{ intermediateModelFile }}.model';
{{/each}}

@Table({ modelName: '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18N', freezeTableName: true, timestamps: false })
export class {{ schema.aggregateName }}I18NModel extends Model<{{ schema.aggregateName }}I18NModel>
{
    {{#each schema.propertiesI18n.modelColumns}}
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