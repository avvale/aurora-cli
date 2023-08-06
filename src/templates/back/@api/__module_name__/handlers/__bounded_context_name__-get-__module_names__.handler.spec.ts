/* eslint-disable @typescript-eslint/no-unused-vars */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule')  path='@nestjs/testing')
            (object items=(array 'IQueryBus') path=config.auroraCorePackage)
            (object items=(sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')  path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Get' (toPascalCase schema.moduleNames) 'Handler') path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
    )
~}}
{{#if schema.properties.hasI18n}}
{{
    push importsArray
        (object items=(array 'CACHE_MANAGER' 'CacheModule') path='@nestjs/cache-manager')
        (object items='ConfigService' path='@nestjs/config')
        (object items=(array 'CoreAddI18nConstraintService' 'CoreGetSearchKeyLangService') path=config.auroraCorePackage)
        (object items='commonMockLangData' path=(sumStrings config.appContainer '/common/lang'))
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler', () =>
{
    let handler: {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            providers: [
                {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler,
                {{#if schema.properties.hasI18n}}
                CoreAddI18nConstraintService,
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_FALLBACK_LANG' ? 'es' : '',
                    },
                },
                {
                    provide : CACHE_MANAGER,
                    useValue: {
                        get: (key: string) => key === 'common/langs' ? commonMockLangData : null,
                    },
                },
                {{/if}}
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {{#if schema.properties.hasI18n}}
                {
                    provide : CoreGetSearchKeyLangService,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
                {{/if}}
            ],
        })
            .compile();

        handler = module.get<{{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler>({{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('{{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                    {{#if schema.properties.hasI18n}}
                    'en',
                    {{/if}}
                ),
            )
                .toBe({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data);
        });
    });
});
