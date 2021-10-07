import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from '{{ config.auroraCorePackage }}';
import { I{{ toPascalCase schema.moduleName }}Repository } from './../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ schema.aggregateName }} } from './../../domain/{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toPascalCase schema.moduleName }}Mapper } from './../../domain/{{ toKebabCase schema.moduleName }}.mapper';
import { {{ schema.aggregateName }}Model } from './sequelize-{{ toKebabCase schema.moduleName }}.model';

@Injectable()
export class Sequelize{{ toPascalCase schema.moduleName }}Repository extends SequelizeRepository<{{ schema.aggregateName }}, {{ schema.aggregateName }}Model> implements I{{ toPascalCase schema.moduleName }}Repository
{
    public readonly aggregateName: string = '{{ schema.aggregateName }}';
    public readonly mapper: {{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        @InjectModel({{ schema.aggregateName }}Model)
        public readonly repository: typeof {{ schema.aggregateName }}Model,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
    {{#hasItems schema.properties.withRelationshipManyToMany }}

    // hook called after create aggregate
    async createdAggregateHook(aggregate: {{ schema.aggregateName }}, model: {{ schema.aggregateName }}Model)
    {
        // add many to many relation
        {{#each schema.properties.withRelationshipManyToMany}}
        if (aggregate.{{ toCamelCase name }}.length > 0) await model.$add('{{ toCamelCase nativeName }}', aggregate.{{ toCamelCase name }}.value);
        {{/each}}
    }

    // hook called after create aggregate
    async updatedAggregateHook(aggregate: {{ schema.aggregateName }}, model: {{ schema.aggregateName }}Model)
    {
        // set many to many relation
        {{#each schema.properties.withRelationshipManyToMany}}
        if (aggregate.{{ toCamelCase name }}.isArray()) await model.$set('{{ toCamelCase nativeName }}', aggregate.{{ toCamelCase name }}.value);
        {{/each}}
    }
    {{/hasItems}}
}