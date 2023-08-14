import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '{{ config.auroraCorePackage }}';
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.repository';
import {
    {{> importValueObjects }}
} from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/value-objects';
import { {{ schema.aggregateName }} } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data } from './{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.data';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository extends MockRepository<{{ schema.aggregateName }}> implements {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository
{
    public readonly repository: any;
    public readonly aggregateName: string = '{{ schema.aggregateName }}';
    public collectionSource: {{ schema.aggregateName }}[];
    public deletedAtInstance: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}DeletedAt = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}DeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>{{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push({{ schema.aggregateName }}.register(
                {{#each schema.aggregateProperties.mock}}
                {{#if (isAllowProperty ../schema.moduleName this)}}
                new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(itemCollection.{{ toCamelCase name }}),
                {{/if}}
                {{/each}}
            ));
        }
    }
}
