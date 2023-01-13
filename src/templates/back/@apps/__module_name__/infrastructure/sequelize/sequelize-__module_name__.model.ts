/* eslint-disable indent */
/* eslint-disable key-spacing */
import { {{#if schema.hasAuditing}}AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, {{/if}}Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
{{#each schema.properties.withImportRelationshipOneToOne}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
{{/each}}
{{#each schema.properties.withImportRelationshipManyToOne}}
{{#unless (isI18NRelationProperty ../schema.moduleName this)}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
{{/unless}}
{{/each}}
{{#each schema.properties.withImportRelationshipOneToMany}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
{{/each}}
{{#each schema.properties.withImportRelationshipManyToMany}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
import { {{ pivotAggregateName }}Model } from '{{ config.applicationsContainer }}/{{ pivotPath }}/infrastructure/sequelize/sequelize-{{ pivotFileName }}.model';
{{/each}}
{{#if schema.properties.hasI18n}}
import { {{ schema.aggregateName }}I18NModel } from './sequelize-{{ toKebabCase schema.moduleName }}-i18n.model';
{{/if}}
{{#if schema.hasAuditing}}

// auditing
import { SequelizeAuditingAgent } from '@apps/auditing/side-effect/infrastructure/sequelize/sequelize-auditing-agent';
import { AuditingSideEffectEvent } from '@api/graphql';
{{/if}}

@Table({
    modelName: '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}',
    freezeTableName: true,
    timestamps: false,
    {{#if schema.properties.hasIndex}}
    indexes: [
        {{#each schema.properties.columnsWithIndex}}
        {
            fields: ['{{ toCamelCase name }}'],
            {{#eq index 'index' }}
            unique: false,
            {{/eq}}
            {{#eq index 'unique' }}
            unique: true,
            {{/eq}}
            {{#if indexName}}
            name: '{{ indexName }}',
            {{/if}}
        },
        {{/each}}
    ],
    {{/if}}
})
export class {{ schema.aggregateName }}Model extends Model<{{ schema.aggregateName }}Model>
{
    {{#if schema.hasAuditing}}
    @AfterCreate
    static auditingCreate(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@apps/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model',
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
            '@apps/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model',
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
            '@apps/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model',
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
            '@apps/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model',
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
            '@apps/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model',
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
            '@apps/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model',
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
            '@apps/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model',
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
            '@apps/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model',
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
            '@apps/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    {{/if}}
    {{#each schema.properties.modelColumns}}
    {{#unless isI18n }}
    {{#if hasColumnDecorator }}
    {{#eq relationship ../relationship.ONE_TO_ONE }}
    @ForeignKey(() => {{ relationshipAggregate }}Model)
    {{/eq}}
    {{#eq relationship ../relationship.MANY_TO_ONE }}
    @ForeignKey(() => {{ relationshipAggregate }}Model)
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
        {{#unless (isUndefined defaultValue) }}
        defaultValue: {{{ getDefaultValue }}},
        {{/unless}}
        {{#unless relationshipAvoidConstraint }}
        {{#eq relationship ../relationship.MANY_TO_ONE }}
        references: {
            key: '{{ getReferenceKey }}'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        {{/eq}}
        {{/unless}}
    })
    {{ toCamelCase name }}: {{{ getJavascriptModelType }}};
    {{/if}}
    {{#if hasHasOneDecorator }}

    @HasOne(() => {{ relationshipAggregate }}Model{{#or relationshipAvoidConstraint }}, {
        {{#if relationshipAvoidConstraint }}
        constraints: false,
        {{/if}}
    }{{/or}})
    {{ toCamelCase name }}: {{ relationshipAggregate }}Model;
    {{/if}}
    {{#if hasBelongsToDecorator }}

    @BelongsTo(() => {{ relationshipAggregate }}Model{{#or relationshipAvoidConstraint }}, {
        {{#if relationshipAvoidConstraint }}
        constraints: false,
        {{/if}}
        foreignKey: '{{ toCamelCase name }}',
    }{{/or}})
    {{ toCamelCase relationshipField }}: {{ relationshipAggregate }}Model;
    {{/if}}
    {{#if hasHasManyDecorator }}

    @HasMany(() => {{ relationshipAggregate }}Model{{#or relationshipKey relationshipAvoidConstraint }}, {
        {{#if relationshipKey }}
        foreignKey: '{{ relationshipKey }}',
        {{/if}}
        {{#if relationshipAvoidConstraint }}
        constraints: false,
        {{/if}}
    }{{/or}})
    {{ toCamelCase name }}: {{ relationshipAggregate }}Model[];
    {{/if}}
    {{#if hasBelongsToManyDecorator }}

    {{#if pivotAggregateName }}
    @BelongsToMany(() => {{ relationshipAggregate }}Model, {
        through: () => {{ pivotAggregateName }}Model,
        uniqueKey: 'Uq01{{ toPascalCase pivotAggregateName }}',
        {{#if relationshipAvoidConstraint }}
        constraints: false,
        {{/if}}
    })
    {{ toCamelCase originName }}: {{ relationshipAggregate }}Model[];
    {{#if isDenormalized }}

    @Column({
        field: '{{ toCamelCase relationshipSingularName }}Ids',
        allowNull: {{ nullable }},
        type: DataTypes.JSON,
        {{#unless (isUndefined defaultValue) }}
        defaultValue: {{{ getDefaultValue }}},
        {{/unless}}
    })
    {{ toCamelCase name }}: any;
    {{/if}}
    {{else}}
    @BelongsToMany(() => {{ relationshipAggregate }}Model, {
        through: () => {{ pivotAggregateName }}Model,
        {{#if relationshipAvoidConstraint }}
        constraints: false,
        {{/if}}
    })
    {{ toCamelCase originName }}: {{ relationshipAggregate }}Model[];
    {{/if}}
    {{/if}}

    {{/unless}}
    {{/each}}
    {{#if schema.properties.hasI18n}}
    // i18n relation
    @HasOne(() => {{ schema.aggregateName }}I18NModel, { as: '{{ schema.moduleName }}I18N' })
    {{ toCamelCase schema.moduleName }}I18N: {{ schema.aggregateName }}I18NModel;
    {{/if}}
}