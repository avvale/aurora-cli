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
                        (sumStrings (toPascalCase schema.boundedContextName) 'Get' (toPascalCase schema.moduleNames) 'Resolver')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Get' (toPascalCase schema.moduleNames) 'Handler')
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
describe('{{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Resolver', () =>
{
    let resolver: {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Resolver;
    let handler: {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            providers: [
                {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Resolver,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<{{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Resolver>({{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Resolver);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler>({{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler);
    });

    test('{{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Resolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Resolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data)));
            expect(await resolver.main()).toBe({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data);
        });
    });
});
