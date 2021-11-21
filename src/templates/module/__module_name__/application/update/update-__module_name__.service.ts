import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '{{ config.auroraCorePackage }}';
import { CQMetadata } from '{{ config.auroraCorePackage }}';
import {
    {{> importValueObjects }}
} from './../../domain/value-objects';
import { I{{ toPascalCase schema.moduleName }}Repository } from './../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ schema.aggregateName }} } from './../../domain/{{ toKebabCase schema.moduleName }}.aggregate';

@Injectable()
export class Update{{ toPascalCase schema.moduleName }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
    ) {}

    public async main(
        payload: {
            {{#each schema.properties.updateService}}
            {{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}: {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
            {{/each}}
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const {{ toCamelCase schema.moduleName }} = {{ schema.aggregateName }}.register(
            {{#each schema.properties.updateService}}
            payload.{{ toCamelCase name }},
            {{/each}}
            null,
            new {{ toPascalCase schema.moduleName }}UpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update({{ toCamelCase schema.moduleName }}, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const {{ toCamelCase schema.moduleName }}Register = this.publisher.mergeObjectContext(
            {{ toCamelCase schema.moduleName }}
        );

        {{ toCamelCase schema.moduleName }}Register.updated({{ toCamelCase schema.moduleName }}); // apply event to model events
        {{ toCamelCase schema.moduleName }}Register.commit(); // commit all events of model
    }
}