{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (object
                items=
                (
                    array
                        (sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleNames) 'CommandHandler')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleNames) 'Command')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleNames) 'Service')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}CommandHandler', () =>
{
    let commandHandler: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}CommandHandler;
    let service: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}CommandHandler,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}CommandHandler>({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}CommandHandler);
        service = module.get<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service>({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service);
    });

    describe('main', () =>
    {
        test('Update{{ toPascalCase schema.moduleNames }}CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleNames }} updated', async () =>
        {
            expect(await commandHandler.execute(
                new {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Command(
                    {
                        {{#each (getUpdateControllerProperties schema.aggregateProperties) }}
                        {{ toCamelCase (getPropertyName this) }}: {{ toCamelCase ../schema.boundedContextName }}Mock{{ toPascalCase ../schema.moduleName }}Data[0].{{ toCamelCase (getPropertyName this) }},
                        {{/each}}
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
