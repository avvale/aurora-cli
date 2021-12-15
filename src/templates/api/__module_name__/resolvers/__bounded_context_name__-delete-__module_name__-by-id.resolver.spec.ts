/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
{{#if schema.properties.hasI18n}}
import { CacheModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
{{/if}}
import { ICommandBus, IQueryBus } from '{{ config.auroraCorePackage }}';

// custom items
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver } from './{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.resolver';
{{#if schema.properties.hasI18n}}
import { AddI18NConstraintService } from '@apps/common/lang/application/shared/add-i18n-constraint.service';
import { GetLangsCacheService } from '@apps/common/lang/application/shared/get-langs-cache.service';
{{/if}}

// sources
{{#if schema.properties.hasI18n}}
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
{{/if}}
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';

describe('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver', () =>
{
    let resolver: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver;
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
                {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver,
                {{#if schema.properties.hasI18n}}
                AddI18NConstraintService,
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_LANG' ? 'es' : ''
                    }
                },
                {
                    provide : GetLangsCacheService,
                    useValue: {
                        main: () => langs,
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

        resolver    = module.get<{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver>({{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleName }} deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.moduleNames }}[0])));
            expect(await resolver.main({{ toCamelCase schema.moduleNames }}[0].id)).toBe({{ toCamelCase schema.moduleNames }}[0]);
        });
    });
});