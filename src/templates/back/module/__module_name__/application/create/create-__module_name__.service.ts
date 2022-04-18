import { ConflictException, Injectable{{#if schema.properties.hasI18n}}, NotFoundException{{/if}} } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.moduleName }}.repository';
{{> importI18NRepository}}
import { {{ schema.aggregateName }} } from '../../domain/{{ toKebabCase schema.moduleName }}.aggregate';
{{#if schema.properties.hasI18n}}
import * as _ from 'lodash';
{{/if}}

@Injectable()
export class Create{{ toPascalCase schema.moduleName }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18NRepository}}
    ) {}

    async main(
        payload: {
            {{#each schema.properties.createService}}
            {{#if (allowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }};
            {{/if}}
            {{/each}}
        },
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const {{ toCamelCase schema.moduleName }} = {{ schema.aggregateName }}.register(
            {{#each schema.properties.aggregate}}
            {{#unless isI18n}}
{{#eq name 'createdAt'}}
            new {{ toPascalCase ../schema.moduleName }}CreatedAt({ currentTimestamp: true }),
{{else eq name 'updatedAt'}}
            new {{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq name 'deletedAt'}}
            null, // deletedAt
{{else}}
{{#if (isI18NDataLangProperty . ../schema.properties)}}
            null, // dataLang
{{else}}
            payload.{{ toCamelCase name }},
{{/if}}
{{/eq}}
            {{/unless}}
            {{#and isI18n (allowProperty ../schema.moduleName this)}}
            payload.{{ toCamelCase name }},
            {{/and}}
            {{/each}}
        );

        {{#if schema.properties.hasI18n}}
        try
        {
            // try get object from database
            const {{ toCamelCase schema.moduleName }}InDB = await this.repository.findById({{ toCamelCase schema.moduleName }}.id, { constraint: { include: ['{{ toCamelCase schema.moduleName }}I18N']}});

            if ({{ toCamelCase schema.moduleName }}InDB.dataLang.value.includes({{ toCamelCase schema.moduleName }}.langId.value)) throw new ConflictException(`Error to create {{ schema.aggregateName }}, the id ${{ bracketOpen }}{{ toCamelCase schema.moduleName }}['id']['value']} already exist in database`);

            // add new lang id to data lang field to create or update field
            {{ toCamelCase schema.moduleName }}.dataLang = new {{ toPascalCase schema.moduleName }}DataLang(_.union({{ toCamelCase schema.moduleName }}InDB.dataLang.value, [{{ toCamelCase schema.moduleName }}.langId.value]));
            await this.repository.update({{ toCamelCase schema.moduleName }}, { dataFactory: aggregate => _.pick(aggregate.toI18nDTO(), 'id', 'dataLang') });
        }
        catch (error)
        {
            if (error instanceof NotFoundException)
            {
                {{ toCamelCase schema.moduleName }}.dataLang = new {{ toPascalCase schema.moduleName }}DataLang([{{ toCamelCase schema.moduleName }}.langId.value]);
                await this.repository.create({{ toCamelCase schema.moduleName }});
            }
        }

        // save new i18n record
        await this.repositoryI18n.create(
            {{ toCamelCase schema.moduleName }},
            {
                dataFactory         : (aggregate: {{ schema.aggregateName }} ) => aggregate.toI18nDTO(),
                finderQueryStatement: (aggregate: {{ schema.aggregateName }} ) => ({
                    where: {
                        {{ toCamelCase schema.moduleName }}Id: aggregate['id']['value'],
                        langId: aggregate['langId']['value'],
                    }
                })
            }
        );
        {{else}}
        await this.repository.create({{ toCamelCase schema.moduleName }});
        {{/if}}

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const {{ toCamelCase schema.moduleName }}Register = this.publisher.mergeObjectContext(
            {{ toCamelCase schema.moduleName }}
        );

        {{ toCamelCase schema.moduleName }}Register.created({{ toCamelCase schema.moduleName }}); // apply event to model events
        {{ toCamelCase schema.moduleName }}Register.commit(); // commit all events of model
    }
}