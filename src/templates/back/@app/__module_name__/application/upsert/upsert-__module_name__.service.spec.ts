/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { Upsert{{ toPascalCase schema.moduleName }}Service } from './upsert-{{ toKebabCase schema.moduleName }}.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.moduleName }}.repository';
{{#if schema.properties.hasI18n}}
import { I{{ toPascalCase schema.moduleName }}I18NRepository } from '../../domain/{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}
import { Mock{{ toPascalCase schema.moduleName }}Repository } from '../../infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';

describe('Upsert{{ toPascalCase schema.moduleName }}Service', () =>

{
    let service: Upsert{{ toPascalCase schema.moduleName }}Service;
    let repository: I{{ toPascalCase schema.moduleName }}Repository;
    {{#if schema.properties.hasI18n}}
    let repositoryI18N: I{{ toPascalCase schema.moduleName }}I18NRepository;
    {{/if}}
    let mockRepository: Mock{{ toPascalCase schema.moduleName }}Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                Upsert{{ toPascalCase schema.moduleName }}Service,
                Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide : I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
                {{#if schema.properties.hasI18n}}
                {
                    provide : I{{ toPascalCase schema.moduleName }}I18NRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
                {{/if}}
            ],
        })
            .compile();

        service         = module.get(Upsert{{ toPascalCase schema.moduleName }}Service);
        repository      = module.get(I{{ toPascalCase schema.moduleName }}Repository);
        {{#if schema.properties.hasI18n}}
        repositoryI18N  = module.get(I{{ toPascalCase schema.moduleName }}I18NRepository);
        {{/if}}
        mockRepository  = module.get(Mock{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('Upsert{{ toPascalCase schema.moduleName }}Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a {{ toCamelCase schema.moduleName }} and emit event', async () =>
        {
            expect(await service.main(
                {
                    {{#each schema.properties.upsertService}}
                    {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleNames }}[0].{{ toCamelCase name }}),
                    {{/each}}
                },
            )).toBe(undefined);
        });
    });
});