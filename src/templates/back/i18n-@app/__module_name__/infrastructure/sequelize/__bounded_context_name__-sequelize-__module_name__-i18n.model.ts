/* eslint-disable indent */
/* eslint-disable key-spacing */
{{#if schema.hasAuditing}}
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
{{/if}}
import { {{#if schema.hasAuditing}}AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, {{/if}}Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
{{#each (getWithRelationshipOneToOneProperties schema.aggregateProperties) }}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each (getWithImportRelationshipManyToOneProperties schema.aggregateProperties) }}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each (getWithRelationshipOneToManyProperties schema.aggregateProperties) }}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
import { {{ relationship.pivot.aggregateName }}Model } from '{{ config.appContainer }}/{{ toKebabCase relationship.pivot.boundedContextName }}/{{ toKebabCase relationship.pivot.moduleName }}';
{{/each}}

@Table({
    modelName: '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18n',
    freezeTableName: true,
    timestamps: false,
    {{#if (hasIndexI18nProperties schema.aggregateProperties) }}
    indexes: [
{{{
    indexesManager (
        object
            indexes=(getIndexesProperties schema.aggregateProperties)
            isI18n=true
    )
}}}
    ],
    {{/if}}
})
export class {{ schema.aggregateName }}I18nModel extends Model<{{ schema.aggregateName }}I18nModel>
{
    {{#if schema.hasAuditing}}
    @AfterCreate
    static auditingCreate(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterRestore
    static auditingRestore(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    {{/if}}
    {{#each schema.aggregateProperties }}
    {{#if isI18n }}
    {{#if (hasColumnDecoratorProperty this) }}
    {{#eq relationship.type ../relationshipType.ONE_TO_ONE }}
    @ForeignKey(() => {{ relationship.aggregateName }}Model)
    {{/eq}}
    {{#eq relationship.type ../relationshipType.MANY_TO_ONE }}
    @ForeignKey(() => {{ relationship.aggregateName }}Model)
    {{/eq}}
    @Column({
        field: '{{ toCamelCase (getPropertyName this) }}',
        {{#if primaryKey }}
        primaryKey: {{ primaryKey }},
        {{/if}}
        {{#if autoIncrement }}
        autoIncrement: {{ autoIncrement }},
        {{/if}}
        allowNull: {{ nullable }},
        type: {{{ getSequelizeTypeProperty this ../config }}},
        {{#unless (isUndefined defaultValue) }}
        defaultValue: {{{ getDefaultValueProperty this }}},
        {{/unless}}
        {{#unless relationship.avoidConstraint }}
        {{#eq relationship.type ../relationshipType.MANY_TO_ONE }}
        references: {
            key: '{{ getReferenceKeyProperty this }}',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        {{/eq}}
        {{/unless}}
    })
    {{ toCamelCase (getPropertyName this) }}: {{{ getJavascriptTypeProperty this ../config }}};
    {{/if}}
    {{#if (hasHasOneDecoratorProperty this) }}

    @HasOne(() => {{ relationship.aggregateName }}Model{{#or relationship.avoidConstraint }}, {
        {{#if relationship.avoidConstraint }}
        constraints: false,
        {{/if}}
    }{{/or}})
    {{ toCamelCase (getPropertyName this) }}: {{ relationship.aggregateName }}Model;
    {{/if}}
    {{#if (hasHasBelongsToDecoratorProperty this) }}

    @BelongsTo(() => {{ relationship.aggregateName }}Model{{#or relationship.avoidConstraint }}, {
        {{#if relationship.avoidConstraint }}
        constraints: false,
        {{/if}}
        foreignKey: '{{ toCamelCase (getPropertyName this) }}',
    }{{/or}})
    {{ toCamelCase relationship.field }}: {{ relationship.aggregateName }}Model;
    {{/if}}
    {{#if (hasHasManyDecoratorProperty this) }}

    @HasMany(() => {{ relationship.aggregateName }}Model{{#or relationship.key relationship.avoidConstraint }}, {
        {{#if relationship.key }}
        foreignKey: '{{ relationship.key }}',
        {{/if}}
        {{#if relationship.avoidConstraint }}
        constraints: false,
        {{/if}}
    }{{/or}})
    {{ toCamelCase (getPropertyName this) }}: {{ relationship.aggregateName }}Model[];
    {{/if}}
    {{#if (hasHasBelongsToManyDecoratorProperty this) }}

    {{#if relationship.pivot.aggregateName }}
    @BelongsToMany(() => {{ relationship.aggregateName }}Model, {
        through: () => {{ relationship.pivot.aggregateName }}Model,
        uniqueKey: 'Uq01{{ toPascalCase relationship.pivot.aggregateName }}',
        {{#if relationship.avoidConstraint }}
        constraints: false,
        {{/if}}
    })
    {{ toCamelCase name }}: {{ relationship.aggregateName }}Model[];
    {{#if relationship.isDenormalized }}

    @Column({
        field: '{{ toCamelCase relationship.singularName }}Ids',
        allowNull: {{ nullable }},
        type: DataTypes.JSON,
        {{#unless (isUndefined defaultValue) }}
        defaultValue: {{{ getDefaultValueProperty this }}},
        {{/unless}}
    })
    {{ toCamelCase (getPropertyName this) }}: any;
    {{/if}}
    {{else}}
    @BelongsToMany(() => {{ relationship.aggregateName }}Model, {
        through: () => {{ relationship.pivot.aggregateName }}Model,
        {{#if relationship.avoidConstraint }}
        constraints: false,
        {{/if}}
    })
    {{ toCamelCase name }}: {{ relationship.aggregateName }}Model[];
    {{/if}}
    {{/if}}

    {{/if}}
    {{/each}}
}