{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (object items=(array 'CacheModule') path='@nestjs/cache-manager')
            (object items=(sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Controller')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Handler')
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller', () =>
{
    let controller: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller;
    let handler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            controllers: [
                {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller,
            ],
            providers: [
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleName }} created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0])));
            expect(await controller.main({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0])).toBe({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0]);
        });
    });
});
