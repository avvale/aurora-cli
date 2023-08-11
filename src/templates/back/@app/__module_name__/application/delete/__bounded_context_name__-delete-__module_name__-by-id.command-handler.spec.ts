{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (object
                items=
                (
                    array
                        (sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleName) 'ByIdCommandHandler')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleName) 'ByIdCommand')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleName) 'ByIdService')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler', () =>
{
    let commandHandler: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler;
    let service: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService;

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
        service = module.get<{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService>({{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService);
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