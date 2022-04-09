/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
{{#if schema.properties.hasI18n}}
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
{{/if}}

// custom items
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller } from './{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.controller';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.handler';

// sources
{{#if schema.properties.hasI18n}}
import { langs } from '{{#eq schema.boundedContextName 'common'}}../../../../{{ config.applicationsContainer }}/common/lang/infrastructure/seeds/lang.seed{{else}}aurora-ts-common{{/eq}}';
{{/if}}
import { {{ toCamelCase schema.moduleNames }} } from '../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';

describe('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller', () =>
{
    let controller: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller;
    let handler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            controllers: [
                {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller,
            ],
            providers: [
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleName }} created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.moduleNames }}[0])));
            expect(await controller.main({{ toCamelCase schema.moduleNames }}[0])).toBe({{ toCamelCase schema.moduleNames }}[0]);
        });
    });
});