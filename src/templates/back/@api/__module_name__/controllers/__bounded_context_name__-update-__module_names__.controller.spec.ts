{{
    setVar 'importsArray' (
        array
            (object items=(array 'Testing' 'TestingModule')  path='@nestjs/testing')
            (object items=(array 'ApiTags' 'ApiOkResponse' 'ApiOperation' 'ApiBody' 'ApiQuery')  path='@nestjs/swagger')
            (object items=(array 'Auditing' 'AuditingMeta' 'Timezone' 'QueryStatement')  path=config.auroraCorePackage)
            (object
                items=
                (
                    array
                    (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'Controller')
                    (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'Handler')
                    (sumStrings (toPascalCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
    )
~}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(array 'CacheModule') path='@nest/cache-manager')
    (object items='commonMockLangData' path=(sumStrings config.appContainer '/common/lang'))
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Controller', () =>
{
    let controller: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Controller;
    let handler: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            controllers: [
                {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Controller,
            ],
            providers: [
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Controller>({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Controller);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Handler>({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Handler);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a {{ toCamelCase schema.moduleNames }} updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0])));
            expect(await controller.main({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0])).toBe({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0]);
        });
    });
});