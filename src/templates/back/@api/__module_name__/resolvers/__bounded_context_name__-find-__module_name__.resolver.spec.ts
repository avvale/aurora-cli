/* eslint-disable @typescript-eslint/no-unused-vars */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule')  path='@nestjs/testing')
            (object items=(sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
            (object
                items=
                (
                    array
                    (sumStrings (toPascalCase schema.boundedContextName) 'Find' (toPascalCase schema.moduleName) 'Resolver')
                    (sumStrings (toPascalCase schema.boundedContextName) 'Find' (toPascalCase schema.moduleName) 'Handler')
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
describe('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver', () =>
{
    let resolver: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver;
    let handler: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Handler;

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
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Handler>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Handler);
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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0])));
            expect(await resolver.main()).toBe({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0]);
        });
    });
});
