/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
{{#each schema.properties.withRelationshipOneToOne}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipManyToOne}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipOneToMany}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
import { {{ pivotAggregateName }}Model } from '../../../../../{{ config.applicationsContainer }}/{{ pivotPath }}/infrastructure/sequelize/sequelize-{{ pivotFileName }}.model';
{{/each}}

@Table({ modelName: '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18N', freezeTableName: true, timestamps: false })
export class {{ schema.aggregateName }}I18NModel extends Model<{{ schema.aggregateName }}I18NModel>
{
    {{#each schema.properties.modelColumns}}
    {{#if isI18n }}
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
    {{#if indexName}}
    @Unique('{{ indexName }}')
    {{else}}
    @Unique
    {{/if}}
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
        {{#if false }}
        {{#eq relationship ../relationship.MANY_TO_ONE }}
        references: {
            key: '{{ getReferenceKey }}'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        {{/eq}}
        {{/if}}
    })
    {{ toCamelCase name }}: {{{ getJavascriptType }}};
    {{/if}}
    {{#if hasHasOneDecorator }}

    @HasOne(() => {{ relationshipAggregate }}Model)
    {{ toCamelCase name }}: {{ relationshipAggregate }}Model;
    {{/if}}
    {{#if hasBelongsToDecorator }}

    @BelongsTo(() => {{ relationshipAggregate }}Model, { constraints: false })
    {{ toCamelCase relationshipField }}: {{ relationshipAggregate }}Model;
    {{/if}}
    {{#if hasHasManyDecorator }}

    @HasMany(() => {{ relationshipAggregate }}Model{{#if relationshipKey }}, '{{ relationshipKey }}'{{/if}})
    {{ toCamelCase name }}: {{ relationshipAggregate }}Model[];
    {{/if}}
    {{#if hasBelongsToManyDecorator }}

    {{#if pivotAggregateName }}
    @BelongsToMany(() => {{ relationshipAggregate }}Model, { through: () => {{ pivotAggregateName }}Model, uniqueKey: 'Uq01{{ toPascalCase pivotAggregateName }}' })
    {{ toCamelCase nativeName }}: {{ relationshipAggregate }}Model[];
    {{else}}
    @BelongsToMany(() => {{ relationshipAggregate }}Model, () => {{ pivotAggregateName }}Model)
    {{ toCamelCase nativeName }}: {{ relationshipAggregate }}Model[];
    {{/if}}
    {{/if}}

    {{/if}}
    {{/each}}
}