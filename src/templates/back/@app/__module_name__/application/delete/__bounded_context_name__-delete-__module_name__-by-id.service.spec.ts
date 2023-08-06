/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.data';
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService } from './{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.service';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Id } from '../../domain/value-objects';
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.repository';
{{#if schema.properties.hasI18n}}
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}
import { {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository } from '../../infrastructure/mock/{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.repository';

describe('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService', () =>
{
    let service: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService;
    let repository: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository;
    let mockRepository: {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService,
                {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                        {{#if schema.properties.hasI18n}}
                        update    : () => { /**/ },
                        {{/if}}
                    },
                },
                {{#if schema.properties.hasI18n}}
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository,
                    useValue: {
                        get   : queryStatement => { /**/ },
                        delete: queryStatement => { /**/ },
                    },
                },
                {{/if}}
            ],
        })
            .compile();

        service = module.get({{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService);
        repository = module.get({{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository);
        mockRepository = module.get({{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete {{ toCamelCase schema.moduleName }} and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Id({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0].id),
                    {},
                    {{#if schema.properties.hasI18n}}
                    {
                        meta: {
                            fallbackLang: {
                                id        : '7c4754e7-3363-48ca-af99-632522226b51',
                                name      : 'English',
                                image     : 'us',
                                iso6392   : 'en',
                                iso6393   : 'eng',
                                ietf      : 'en-US',
                                customCode: null,
                                dir       : 'RTL',
                                sort      : 0,
                                isActive  : true,
                            },
                            contentLanguage: {
                                id        : '7c4754e7-3363-48ca-af99-632522226b51',
                                name      : 'English',
                                image     : 'us',
                                iso6392   : 'en',
                                iso6393   : 'eng',
                                ietf      : 'en-US',
                                customCode: null,
                                dir       : 'RTL',
                                sort      : 0,
                                isActive  : true,
                            },
                        },
                    },
                    {{/if}}
                ),
            )
                .toBe(undefined);
        });
    });
});
