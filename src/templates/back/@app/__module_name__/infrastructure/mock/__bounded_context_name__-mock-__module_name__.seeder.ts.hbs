import { Injectable } from '@nestjs/common';
import { MockSeeder } from '{{ config.auroraCorePackage }}';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';
import { {{ schema.aggregateName }} } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data } from './{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.data';
import * as _ from 'lodash';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Seeder extends MockSeeder<{{ schema.aggregateName }}>
{
    public collectionSource: {{ schema.aggregateName }}[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const {{ toCamelCase schema.moduleName }} of _.orderBy({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data, ['id']))
        {
            this.collectionSource.push(
                {{ schema.aggregateName }}.register(
                    {{#each (getAggregateProperties schema.aggregateProperties) }}
                    {{#unless isI18n}}
{{#eq (getPropertyName this) 'createdAt'}}
                    new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}CreatedAt({ currentTimestamp: true }),
{{else eq (getPropertyName this) 'updatedAt'}}
                    new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq (getPropertyName this) 'deletedAt'}}
                    new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}DeletedAt(null),
{{else}}
                    new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase (getPropertyName this) }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getPropertyName this) }}),
{{/eq}}
                    {{/unless}}
                    {{#and isI18n (isAllowProperty ../schema.moduleName this)}}
                    new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getPropertyName this) }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getPropertyName this) }}),
                    {{/and}}
                    {{/each}}
                ),
            );
        }
    }
}
