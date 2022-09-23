/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
{{#if schema.properties.hasI18n}}
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
{{/if}}

// custom items
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Controller } from './{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleNames }}.controller';
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleNames }}.handler';

// sources
{{#if schema.properties.hasI18n}}
import { langs } from '{{#eq schema.boundedContextName 'common'}}{{ config.applicationsContainer }}/common/lang/infrastructure/seeds/lang.seed{{else}}aurora-ts-common{{/eq}}';
{{/if}}
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';

describe('{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}ByIdController', () =>
{
    let controller: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Controller;
    let handler: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            controllers: [
                {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Controller,
            ],
            providers: [
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Controller>({{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Controller);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler>({{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a {{ toCamelCase schema.moduleNames }} upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.moduleNames }}[0])));
            expect(await controller.main({{ toCamelCase schema.moduleNames }}[0])).toBe({{ toCamelCase schema.moduleNames }}[0]);
        });
    });
});