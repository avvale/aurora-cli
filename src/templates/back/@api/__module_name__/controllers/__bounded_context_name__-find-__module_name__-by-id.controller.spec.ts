{{
    setVar 'importsArray' (
        array
            (object items=(array 'Testing' 'TestingModule')  path='@nestjs/testing')
            (object
                items=
                (
                    array
                    (sumStrings (toPascalCase schema.boundedContextName) 'Find' (toPascalCase schema.moduleName) 'ByIdController')
                    (sumStrings (toPascalCase schema.boundedContextName) 'Find' (toPascalCase schema.moduleName) 'ByIdHandler')
                    (sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(array 'CacheModule') path='@nest/cache-manager')
~}}
{{#eq schema.boundedContextName 'common'}}
{{ push importsArray
    (object items='commonMockLangData' path=(sumStrings config.appContainer '/common/lang'))
~}}
{{else}}
{{ push importsArray
    (object items='commonMockLangData' path='@aurorajs.dev/common')
~}}
{{/eq}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController', () =>
{
    let controller: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController;
    let handler: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            controllers: [
                {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController,
            ],
            providers: [
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleName }} by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0])));
            expect(await controller.main({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0].id)).toBe({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0]);
        });
    });
});