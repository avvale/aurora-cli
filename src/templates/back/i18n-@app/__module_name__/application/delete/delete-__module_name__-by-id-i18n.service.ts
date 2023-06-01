import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '{{ config.auroraCorePackage }}';
import { CQMetadata } from '{{ config.auroraCorePackage }}';
import { {{#if schema.properties.hasI18n}}{{ toPascalCase schema.moduleName }}AvailableLangs, {{/if}}{{ toPascalCase schema.moduleName }}Id } from '../../domain/value-objects';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.moduleName }}.repository';
{{> importI18nRepository}}

@Injectable()
export class Delete{{ toPascalCase schema.moduleName }}ByIdI18nService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18nRepository}}
    ) {}

    async main(id: {{ toPascalCase schema.moduleName }}Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const {{ toCamelCase schema.moduleName }} = await this.repository.findById(id, { constraint, cQMetadata });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repositoryI18n.delete({
            queryStatement: {
                where: {
                    langId: {{ toCamelCase schema.moduleName }}.langId.value,
                    {{ toCamelCase schema.moduleName }}Id: {{ toCamelCase schema.moduleName }}.id.value,
                }
            }
        });

        const availableLangs = {{ toCamelCase schema.moduleName }}.availableLangs.value.removeItem({{ toCamelCase schema.moduleName }}.langId.value);

        // if has not any translation in i18n table, delete record
        if (availableLangs.length === 0)
        {
            await this.repository.deleteById({{ toCamelCase schema.moduleName }}.id, { cQMetadata });
        }
        else
        {
            {{ toCamelCase schema.moduleName }}.availableLangs = new {{ toPascalCase schema.moduleName }}AvailableLangs(availableLangs);
            await this.repository.update({{ toCamelCase schema.moduleName }});
        }

        // insert EventBus in object, to be able to apply and commit events
        const {{ toCamelCase schema.moduleName }}Register = this.publisher.mergeObjectContext({{ toCamelCase schema.moduleName }});

        {{ toCamelCase schema.moduleName }}Register.deleted({{ toCamelCase schema.moduleName }}); // apply event to model events
        {{ toCamelCase schema.moduleName }}Register.commit(); // commit all events of model
    }
}