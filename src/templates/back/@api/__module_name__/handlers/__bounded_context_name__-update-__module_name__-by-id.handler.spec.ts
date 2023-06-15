/* eslint-disable @typescript-eslint/no-unused-vars */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule')  path='@nestjs/testing')
            (object items=(array 'ICommandBus' 'IQueryBus') path=config.auroraCorePackage)
            (object items=(toCamelCase schema.moduleNames)  path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/infrastructure/mock/mock-' (toKebabCase schema.moduleName) '.data'))
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdHandler') path=(sumStrings './' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.handler'))
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdInput') path='@api/graphql')
    )
~}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(array 'CACHE_MANAGER' 'CacheModule') path='@nestjs/cache-manager')
    (object items='ConfigService' path='@nestjs/config')
    (object items='CoreAddI18nConstraintService' path=config.auroraCorePackage)
    (object items='langs' path=(sumStrings config.appContainer '/common/lang/infrastructure/mock/mock-lang.data'))
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler', () =>
{
    let handler: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler;
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
                {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler,
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
                        get: (key: string) => key === 'common/langs' ? langs : null,
                    },
                },
                {{/if}}
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler>({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a {{ toCamelCase schema.moduleName }} updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.moduleNames }}[0])));
            expect(await handler.main(<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput>{{ toCamelCase schema.moduleNames }}[0])).toBe({{ toCamelCase schema.moduleNames }}[0]);
        });
    });
});