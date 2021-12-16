/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
{{#if schema.properties.hasI18n}}
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
{{/if}}
import { {{#if schema.properties.hasI18n}}AddI18NConstraintService, {{/if}}ICommandBus, IQueryBus } from '{{ config.auroraCorePackage }}';

// custom items
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller } from './{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleNames }}.controller';

// sources
{{#if schema.properties.hasI18n}}
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
{{/if}}
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';

describe('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller', () =>
{
    let controller: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller;
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
            controllers: [
                {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller
            ],
            providers: [
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

        controller  = module.get<{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller>({{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleNames }} deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.moduleNames }})));
            expect(await controller.main()).toBe({{ toCamelCase schema.moduleNames }});
        });
    });
});