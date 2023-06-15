/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.data';
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService } from './{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.service';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Id } from '../../domain/value-objects';
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.repository';
{{#if schema.properties.hasI18n}}
import { I{{ toPascalCase schema.moduleName }}I18nRepository } from '../../domain/{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}
import { Mock{{ toPascalCase schema.moduleName }}Repository } from '../../infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';

describe('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService', () =>
{
    let service: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService;
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
                Delete{{ toPascalCase schema.moduleName }}ByIdService,
                Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
                {{#if schema.properties.hasI18n}}
                {
                    provide : I{{ toPascalCase schema.moduleName }}I18nRepository,
                    useValue: {
                        get   : queryStatement => { /**/ },
                        delete: queryStatement => { /**/ },
                    },
                },
                {{/if}}
            ],
        })
            .compile();

        service = module.get(Delete{{ toPascalCase schema.moduleName }}ByIdService);
        repository = module.get({{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository);
        mockRepository = module.get(Mock{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('Delete{{ toPascalCase schema.moduleName }}ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete {{ toCamelCase schema.moduleName }} and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new {{ toPascalCase schema.moduleName }}Id({{ toCamelCase schema.moduleNames }}[0].id),
            )).toBe(undefined);
        });
    });
});