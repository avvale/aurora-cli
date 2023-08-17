{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (
                object
                    items=
                    (
                        array
                            (sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')
                            (sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleName) 'ByIdCommand')
                    )
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
            (
                object
                    items=(sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleName) 'ByIdService')
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.service')
            )
            (
                object
                    items=(sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleName) 'ByIdCommandHandler')
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.command-handler')
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler', () =>
{
    let commandHandler: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler>({{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommand(
                    {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
