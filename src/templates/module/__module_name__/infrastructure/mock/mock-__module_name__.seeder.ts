import { Injectable} from '@nestjs/common';
import { MockSeeder } from '{{ config.applicationsContainer }}/shared/infrastructure/persistence/mock/mock.seeder';
import {
    {{#each schema.properties.valueObjects}}
    {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
    {{/each}}
} from './../../domain/value-objects';
import { {{ schema.aggregateName }} } from './../../domain/{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toCamelCase schema.moduleNames }} } from './../seeds/{{ toKebabCase schema.moduleName }}.seed';

@Injectable()
export class Mock{{ toPascalCase schema.moduleName }}Seeder extends MockSeeder<{{ schema.aggregateName }}>
{
    public collectionSource: {{ schema.aggregateName }}[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let {{ toCamelCase schema.moduleName }} of {{ toCamelCase schema.moduleNames }})
        {
            this.collectionSource.push(
                {{ schema.aggregateName }}.register(
                    {{#each schema.properties.createService}}
                    new {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}),
                    {{/each}}
                    new {{ toPascalCase schema.moduleName }}CreatedAt({currentTimestamp: true}),
                    new {{ toPascalCase schema.moduleName }}UpdatedAt({currentTimestamp: true}),
                    new {{ toPascalCase schema.moduleName }}DeletedAt(null),
                )
            );
        }
    }
}