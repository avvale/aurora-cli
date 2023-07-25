/* eslint-disable @typescript-eslint/no-unused-vars */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (object items=(array 'CacheModule') path='@nestjs/cache-manager')
            (object items=(sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdInput') path='@api/graphql')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdResolver')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdHandler')
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
    )
~}}
{{#if schema.properties.hasI18n}}
{{
    push importsArray
        (object items=(array 'CacheModule') path='@nestjs/cache-manager')
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdResolver', () =>
{
    let resolver: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdResolver;
    let handler: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            providers: [
                {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdResolver,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdResolver>({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdResolver);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler>({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler);
    });

    test('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a {{ toCamelCase schema.moduleName }} by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0])));
            expect(await resolver.main(<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput>{{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0])).toBe({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0]);
        });
    });
});
