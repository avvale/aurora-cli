/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
{{#if schema.properties.hasI18n}}
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
{{/if}}

// custom items
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Resolver } from './{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleNames }}.resolver';
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleNames }}.handler';
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput } from 'src/graphql';

// sources
{{#if schema.properties.hasI18n}}
import { langs } from '{{#eq schema.boundedContextName 'common'}}{{ config.applicationsContainer }}/common/lang/infrastructure/seeds/lang.seed{{else}}aurora-ts-common{{/eq}}';
{{/if}}
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';

describe('{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Resolver', () =>
{
    let resolver: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Resolver;
    let handler: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            providers: [
                {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Resolver,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Resolver>({{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Resolver);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler>({{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler);
    });

    test('{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a {{ toCamelCase schema.moduleNames }} by id upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.moduleNames }}[0])));
            expect(await resolver.main(<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput>{{ toCamelCase schema.moduleNames }}[0])).toBe({{ toCamelCase schema.moduleNames }}[0]);
        });
    });
});