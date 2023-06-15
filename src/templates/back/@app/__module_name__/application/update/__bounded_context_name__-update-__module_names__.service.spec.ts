/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.data';
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service } from './{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleNames }}.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.repository';
{{#if schema.properties.hasI18n}}
import { I{{ toPascalCase schema.moduleName }}I18nRepository } from '../../domain/{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}
import { Mock{{ toPascalCase schema.moduleName }}Repository } from '../../infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';

describe('Update{{ toPascalCase schema.moduleNames }}Service', () =>
{
    let service: Update{{ toPascalCase schema.moduleNames }}Service;
    let repository: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository;
    {{#if schema.properties.hasI18n}}
    let repositoryI18n: I{{ toPascalCase schema.moduleName }}I18nRepository;
    {{/if}}
    let mockRepository: Mock{{ toPascalCase schema.moduleName }}Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                Update{{ toPascalCase schema.moduleNames }}Service,
                Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
                {{#if schema.properties.hasI18n}}
                {
                    provide : I{{ toPascalCase schema.moduleName }}I18nRepository,
                    useValue: {
                        update: () => { /**/ },
                    },
                },
                {{/if}}
            ],
        })
            .compile();

        service = module.get(Update{{ toPascalCase schema.moduleNames }}Service);
        repository = module.get({{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository);
        {{#if schema.properties.hasI18n}}
        repositoryI18n = module.get(I{{ toPascalCase schema.moduleName }}I18nRepository);
        {{/if}}
        mockRepository = module.get(Mock{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('Update{{ toPascalCase schema.moduleNames }}Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a {{ toCamelCase schema.moduleNames }} and emit event', async () =>
        {
            expect(await service.main(
                {
                    {{#each schema.properties.updateService}}
                    {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleNames }}[0].{{ toCamelCase name }}),
                    {{/each}}
                },
            )).toBe(undefined);
        });
    });
});