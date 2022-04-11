/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
{{#if schema.properties.hasI18n}}
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
{{/if}}

// custom items
import { {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver } from './{{ toKebabCase schema.boundedContextName }}-paginate-{{ toKebabCase schema.moduleNames }}.resolver';
import { {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-paginate-{{ toKebabCase schema.moduleNames }}.handler';

// sources
{{#if schema.properties.hasI18n}}
import { langs } from '{{#eq schema.boundedContextName 'common'}}../../../../{{ config.applicationsContainer }}/common/lang/infrastructure/seeds/lang.seed{{else}}aurora-ts-common{{/eq}}';
{{/if}}
import { {{ toCamelCase schema.moduleNames }} } from '../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';

describe('{{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver', () =>
{
    let resolver: {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver;
    let handler: {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            providers: [
                {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver    = module.get<{{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver>({{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler>({{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler);
    });

    test('{{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a {{ toCamelCase schema.moduleNames }}', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : {{ toCamelCase schema.moduleNames }},
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : {{ toCamelCase schema.moduleNames }},
            });
        });
    });
});