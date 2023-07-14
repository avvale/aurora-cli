{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (object
                items=
                (
                    array
                        (sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Command')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'CommandHandler')
                )
                path=(sumStrings './' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.command-handler')    
            )
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Service')
                )
                path=(sumStrings './' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.service')    
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}CommandHandler', () =>
{
    let commandHandler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}CommandHandler;
    let service: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}CommandHandler,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}CommandHandler>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}CommandHandler);
        service = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Service>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Service);
    });

    describe('main', () =>
    {
        test('Create{{ toPascalCase schema.moduleName }}CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Service', async () =>
        {
            expect(await commandHandler.execute(
                new {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command(
                    {
                        {{#each schema.properties.createController}}
                        {{ toCamelCase name }}: {{ toCamelCase ../schema.boundedContextName }}Mock{{ toPascalCase ../schema.moduleName }}Data[0].{{ toCamelCase name }},
                        {{/each}}
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});