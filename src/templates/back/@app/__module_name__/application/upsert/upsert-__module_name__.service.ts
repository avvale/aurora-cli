import { ConflictException, Injectable{{#if schema.properties.hasI18n}}, NotFoundException{{/if}} } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.moduleName }}.repository';
{{> importI18nRepository}}
import { {{ schema.aggregateName }} } from '../../domain/{{ toKebabCase schema.moduleName }}.aggregate';
{{#if schema.properties.hasI18n}}
import * as _ from 'lodash';
{{/if}}

@Injectable()
export class Upsert{{ toPascalCase schema.moduleName }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18nRepository}}
    ) {}

    async main(
        payload: {
            {{#each schema.properties.upsertService}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{#unless (isI18nAvailableLangsProperty . ../schema.properties)}}
            {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }};
            {{/unless}}
            {{/if}}
            {{/each}}
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
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
{{#if (isI18nAvailableLangsProperty . ../schema.properties)}}
            null, // availableLangs
{{else}}
            payload.{{ toCamelCase name }},
{{/if}}
{{/eq}}
            {{/unless}}
            {{#and isI18n (isAllowProperty ../schema.moduleName this)}}
            payload.{{ toCamelCase name }},
            {{/and}}
            {{/each}}
        );

        {{#if schema.properties.hasI18n}}
        try
        {
            // try get object from database
            const {{ toCamelCase schema.moduleName }}InDB = await this.repository.findById({{ toCamelCase schema.moduleName }}.id, { constraint: { include: ['{{ toCamelCase schema.moduleName }}I18n']}});

            if ({{ toCamelCase schema.moduleName }}InDB.availableLangs.value.includes({{ toCamelCase schema.moduleName }}.langId.value)) throw new ConflictException(`Error to upsert {{ schema.aggregateName }}, the id ${{ bracketOpen }}{{ toCamelCase schema.moduleName }}['id']['value']} already exist in database`);

            // add new lang id to data lang field to upsert field
            {{ toCamelCase schema.moduleName }}.availableLangs = new {{ toPascalCase schema.moduleName }}AvailableLangs(_.union({{ toCamelCase schema.moduleName }}InDB.availableLangs.value, [{{ toCamelCase schema.moduleName }}.langId.value]));
            await this.repository.update(
                {{ toCamelCase schema.moduleName }},
                {
                    dataFactory  : aggregate => _.pick(aggregate.toI18nDTO(), 'id', 'availableLangs'),
                    updateOptions: cQMetadata?.repositoryOptions,
                },
            );
        }
        catch (error)
        {
            if (error instanceof NotFoundException)
            {
                {{ toCamelCase schema.moduleName }}.availableLangs = new {{ toPascalCase schema.moduleName }}AvailableLangs([{{ toCamelCase schema.moduleName }}.langId.value]);
                await this.repository
                    .upsert(
                        {{ toCamelCase schema.moduleName }},
                        {
                            upsertOptions: cQMetadata?.repositoryOptions,
                        },
                    );
            }
        }

        const modelInDB = await this.repositoryI18n
            .find({
                queryStatement: {
                    where: {
                        {{ toCamelCase schema.moduleName }}Id: {{ toCamelCase schema.moduleName }}.id.value,
                        langId: {{ toCamelCase schema.moduleName }}.langId.value,
                    },
                },
            });

        // upsert i18n aggregate with factory pattern for upsert repository method
        const {{ toCamelCase schema.moduleName }}I18n = {{ schema.aggregateName }}.register(
            {{#each schema.properties.aggregate}}
            {{#unless isI18n}}
{{#eq name 'createdAt'}}
            new {{ toPascalCase ../schema.moduleName }}CreatedAt({ currentTimestamp: true }),
{{else eq name 'updatedAt'}}
            new {{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq name 'deletedAt'}}
            null, // deletedAt
{{else}}
{{#if (isI18nAvailableLangsProperty . ../schema.properties)}}
            {{ toCamelCase schema.moduleName }}.availableLangs,
{{else}}
{{#eq name 'id'}}
            new {{ toPascalCase schema.moduleName }}Id(modelInDB ? modelInDB.id.value : Utils.uuid()),
{{else}}
            payload.{{ toCamelCase name }},
{{/eq}}
{{/if}}
{{/eq}}
            {{/unless}}
            {{#and isI18n (isAllowProperty ../schema.moduleName this)}}
            payload.{{ toCamelCase name }},
            {{/and}}
            {{/each}}
        );

        // save new i18n record
        await this.repositoryI18n
            .upsert(
                {{ toCamelCase schema.moduleName }}I18n,
                {
                    dataFactory  : (aggregate: {{ schema.aggregateName }} ) => aggregate.toI18nDTO(),
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );
        {{else}}
        await this.repository
            .upsert(
                {{ toCamelCase schema.moduleName }},
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );
        {{/if}}

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const {{ toCamelCase schema.moduleName }}Register = this.publisher.mergeObjectContext(
            {{ toCamelCase schema.moduleName }},
        );

        {{ toCamelCase schema.moduleName }}Register.created({{ toCamelCase schema.moduleName }}); // apply event to model events
        {{ toCamelCase schema.moduleName }}Register.commit(); // commit all events of model
    }
}