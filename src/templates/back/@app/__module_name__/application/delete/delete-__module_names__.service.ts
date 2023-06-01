import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { {{#if schema.properties.hasI18n}}Operator, {{/if}}QueryStatement } from '{{ config.auroraCorePackage }}';
import { CQMetadata } from '{{ config.auroraCorePackage }}';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.moduleName }}.repository';
{{> importI18nRepository}}
import { Add{{ toPascalCase schema.moduleNames }}ContextEvent } from '../events/add-{{ toKebabCase schema.moduleNames }}-context.event';

@Injectable()
export class Delete{{ toPascalCase schema.moduleNames }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18nRepository}}
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const {{ toCamelCase schema.moduleNames }} = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        {{#if schema.properties.hasI18n}}
        await this.repositoryI18n.delete({
            queryStatement: {
                where: {
                    {{ toCamelCase schema.moduleName }}Id: { [Operator.in]: {{ toCamelCase schema.moduleNames }}.map(item => item.id) }
                },
            },
            deleteOptions: cQMetadata?.repositoryOptions
        });
        {{/if}}
        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create Add{{ toPascalCase schema.moduleNames }}ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const {{ toCamelCase schema.moduleNames }}Registered = this.publisher.mergeObjectContext(
            new Add{{ toPascalCase schema.moduleNames }}ContextEvent({{ toCamelCase schema.moduleNames }}),
        );

        {{ toCamelCase schema.moduleNames }}Registered.deleted(); // apply event to model events
        {{ toCamelCase schema.moduleNames }}Registered.commit(); // commit all events of model
    }
}