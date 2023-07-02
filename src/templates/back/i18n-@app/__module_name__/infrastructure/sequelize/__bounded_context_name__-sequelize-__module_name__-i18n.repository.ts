import { Injectable } from '@nestjs/common';
import { InjectModel, LiteralObject } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, SequelizeRepository } from '{{ config.auroraCorePackage }}';
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}-i18n.repository';
import { {{ schema.aggregateName }} } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.mapper';
import { {{ schema.aggregateName }}I18nModel } from './{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}-i18n.model';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Sequelize{{ toPascalCase schema.moduleName }}I18nRepository extends SequelizeRepository<{{ schema.aggregateName }}, {{ schema.aggregateName }}I18nModel> implements {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository
{
    public readonly aggregateName: string = '{{ schema.aggregateName }}';
    public readonly mapper: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        @InjectModel({{ schema.aggregateName }}I18nModel)
        public readonly repository: typeof {{ schema.aggregateName }}I18nModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
    {{#hasItems schema.properties.withRelationshipManyToMany }}

    // hook called after create aggregate
    async createdAggregateHook(
        aggregate: {{ schema.aggregateName }},
        model: {{ schema.aggregateName }}Model,
        createOptions: LiteralObject,
    ): Promise<void>
    {
        // add many to many relation
        {{#each schema.properties.withRelationshipManyToMany}}
        if (aggregate.{{ toCamelCase name }}.length > 0)
        {
            await model.$add(
                '{{ toCamelCase originName }}',
                aggregate.{{ toCamelCase name }}.value,
                createOptions,
            );
        }
        {{/each}}
    }

    // hook called after create aggregate
    async updatedAggregateHook(
        aggregate: {{ schema.aggregateName }},
        model: {{ schema.aggregateName }}Model,
        updateByIdOptions: LiteralObject,
    ): Promise<void>
    {
        // set many to many relation
        {{#each schema.properties.withRelationshipManyToMany}}
        if (aggregate.{{ toCamelCase name }}.isArray())
        {
             await model.$set(
                '{{ toCamelCase originName }}',
                aggregate.{{ toCamelCase name }}.value,
                updateByIdOptions,
            );
        }
        {{/each}}
    }
    {{/hasItems}}
}