import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    {{#each schema.properties.valueObjects}}
    {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
    {{/each}}
} from './../../domain/value-objects';
import { I{{ toPascalCase schema.moduleName }}Repository } from './../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ schema.aggregateName }} } from './../../domain/{{ toKebabCase schema.moduleName }}.aggregate';

@Injectable()
export class Create{{ toPascalCase schema.moduleName }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
    ) {}

    public async main(
        payload: {
            {{#each schema.properties.seed}}
            {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
            {{/each}}
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const {{ toCamelCase schema.moduleName }} = {{ schema.aggregateName }}.register(
            {{#each schema.properties.seed}}
            payload.{{ toCamelCase name }},
            {{/each}}
            new {{ toPascalCase schema.moduleName }}CreatedAt({currentTimestamp: true}),
            new {{ toPascalCase schema.moduleName }}UpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create({{ toCamelCase schema.moduleName }});

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const {{ toCamelCase schema.moduleName }}Register = this.publisher.mergeObjectContext(
            {{ toCamelCase schema.moduleName }}
        );

        {{ toCamelCase schema.moduleName }}Register.created({{ toCamelCase schema.moduleName }}); // apply event to model events
        {{ toCamelCase schema.moduleName }}Register.commit(); // commit all events of model
    }
}