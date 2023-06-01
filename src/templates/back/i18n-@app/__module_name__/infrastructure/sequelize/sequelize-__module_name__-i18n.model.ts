/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
{{#each schema.properties.withRelationshipOneToOne}}
import { {{ relationship.aggregate }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModuleName }}.model{{/if}}';
{{/each}}
{{#each schema.properties.withImportRelationshipManyToOne}}
import { {{ relationship.aggregate }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModuleName }}.model{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipOneToMany}}
import { {{ relationship.aggregate }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModuleName }}.model{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ relationship.aggregate }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModuleName }}.model{{/if}}';
import { {{ relationship.pivot.aggregate }}Model } from '{{ config.appContainer }}/{{ relationship.pivot.modulePath }}/infrastructure/sequelize/sequelize-{{ relationship.pivot.fileName }}.model';
{{/each}}

@Table({
    modelName: '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18n',
    freezeTableName: true,
    timestamps: false,
})
export class {{ schema.aggregateName }}I18nModel extends Model<{{ schema.aggregateName }}I18nModel>
{
    {{#each schema.properties.modelColumns}}
    {{#if isI18n }}
    {{#if hasColumnDecorator }}
    {{#eq relationship.type ../relationshipType.ONE_TO_ONE }}
    @ForeignKey(() => {{ relationship.aggregate }}Model)
    {{/eq}}
    {{#eq relationship.type ../relationshipType.MANY_TO_ONE }}
    @ForeignKey(() => {{ relationship.aggregate }}Model)
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
        {{#if autoIncrement }}
        autoIncrement: {{ autoIncrement }},
        {{/if}}
        allowNull: {{ nullable }},
        type: {{{ getSequelizeType }}},
        {{#if defaultValue }}
        defaultValue: {{ getDefaultValue }},
        {{/if}}
        {{#if false }}
        {{#eq relationship.type ../relationshipType.MANY_TO_ONE }}
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

    @HasOne(() => {{ relationship.aggregate }}Model)
    {{ toCamelCase name }}: {{ relationship.aggregate }}Model;
    {{/if}}
    {{#if hasBelongsToDecorator }}

    @BelongsTo(() => {{ relationship.aggregate }}Model, { constraints: false })
    {{ toCamelCase relationship.field }}: {{ relationship.aggregate }}Model;
    {{/if}}
    {{#if hasHasManyDecorator }}

    @HasMany(() => {{ relationship.aggregate }}Model{{#if relationship.key }}, '{{ relationship.key }}'{{/if}})
    {{ toCamelCase name }}: {{ relationship.aggregate }}Model[];
    {{/if}}
    {{#if hasBelongsToManyDecorator }}

    {{#if relationship.pivot.aggregate }}
    @BelongsToMany(() => {{ relationship.aggregate }}Model, { through: () => {{ relationship.pivot.aggregate }}Model, uniqueKey: 'Uq01{{ toPascalCase relationship.pivot.aggregate }}' })
    {{ toCamelCase originName }}: {{ relationship.aggregate }}Model[];
    {{else}}
    @BelongsToMany(() => {{ relationship.aggregate }}Model, () => {{ relationship.pivot.aggregate }}Model)
    {{ toCamelCase originName }}: {{ relationship.aggregate }}Model[];
    {{/if}}
    {{/if}}

    {{/if}}
    {{/each}}
}