import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from '{{ config.auroraCorePackage }}';
import { I{{ toPascalCase schema.moduleName }}I18NRepository } from './../../domain/{{ toKebabCase schema.moduleName }}-i18n.repository';
import { {{ schema.aggregateName }} } from './../../domain/{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toPascalCase schema.moduleName }}Mapper } from './../../domain/{{ toKebabCase schema.moduleName }}.mapper';
import { {{ schema.aggregateName }}I18NModel } from './sequelize-{{ toKebabCase schema.moduleName }}-i18n.model';

@Injectable()
export class Sequelize{{ toPascalCase schema.moduleName }}I18NRepository extends SequelizeRepository<{{ schema.aggregateName }}, {{ schema.aggregateName }}I18NModel> implements I{{ toPascalCase schema.moduleName }}I18NRepository
{
    public readonly aggregateName: string = '{{ schema.aggregateName }}';
    public readonly mapper: {{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        @InjectModel({{ schema.aggregateName }}I18NModel)
        public readonly repository: typeof {{ schema.aggregateName }}I18NModel,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }
    {{#hasItems schema.properties.withRelationshipManyToMany }}

    // hook called after create aggregate
    async createdAggregateHook(aggregate: {{ schema.aggregateName }}, model: {{ schema.aggregateName }}Model): Promise<void>
    {
        // add many to many relation
        {{#each schema.properties.withRelationshipManyToMany}}
        if (aggregate.{{ toCamelCase name }}.length > 0) await model.$add('{{ toCamelCase nativeName }}', aggregate.{{ toCamelCase name }}.value);
        {{/each}}
    }

    // hook called after create aggregate
    async updatedAggregateHook(aggregate: {{ schema.aggregateName }}, model: {{ schema.aggregateName }}Model): Promise<void>
    {
        // set many to many relation
        {{#each schema.properties.withRelationshipManyToMany}}
        if (aggregate.{{ toCamelCase name }}.isArray()) await model.$set('{{ toCamelCase nativeName }}', aggregate.{{ toCamelCase name }}.value);
        {{/each}}
    }
    {{/hasItems}}
}