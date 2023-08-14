/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.data';
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service } from './{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleName }}.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.repository';
{{#if (hasI18nProperties schema.aggregateProperties) }}
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}
import { {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository } from '../../infrastructure/mock/{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.repository';

describe('{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service', () =>

{
    let service: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service,
                {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
                {{#if (hasI18nProperties schema.aggregateProperties) }}
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository,
                    useValue: {
                        upsert: () => { /**/ },
                        find  : () => { /**/ },
                    },
                },
                {{/if}}
            ],
        })
            .compile();

        service = module.get({{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a {{ toCamelCase schema.moduleName }} and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        {{#each schema.aggregateProperties.upsertService}}
                        {{#if (isAllowProperty ../schema.moduleName this) }}
                        {{#unless (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
                        {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0].{{ toCamelCase name }}),
                        {{/unless}}
                        {{/if}}
                        {{/each}}
                    },
                    {{#if (hasI18nProperties schema.aggregateProperties) }}
                    {
                        meta: {
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
