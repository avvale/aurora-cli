/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
{{#if schema.properties.hasI18n}}
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
{{/if}}
import { {{#if schema.properties.hasI18n}}AddI18NConstraintService, {{/if}}ICommandBus, IQueryBus } from '{{ config.auroraCorePackage }}';

// custom items
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver } from './{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.resolver';

// sources
{{#if schema.properties.hasI18n}}
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
{{/if}}
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';

describe('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver', () =>
{
    let resolver: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            providers: [
                {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver,
                {{#if schema.properties.hasI18n}}
                AddI18NConstraintService,
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_LANG' ? 'es' : ''
                    }
                },
                {
                    provide : CACHE_MANAGER,
                    useValue: {
                        get: (key: string) =>
                        {
                            console.log(key);
                            return key === 'common/lang' ? langs : null;
                        },
                    }
                },
                {{/if}}
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    }
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    }
                },
            ]
        }).compile();

        resolver    = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a {{ toCamelCase schema.moduleName }}', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.moduleNames }}[0])));
            expect(await resolver.main()).toBe({{ toCamelCase schema.moduleNames }}[0]);
        });
    });
});