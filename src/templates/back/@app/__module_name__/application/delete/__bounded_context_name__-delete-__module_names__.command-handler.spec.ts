{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleNames) 'CommandHandler')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleNames) 'Command')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleNames) 'Service')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}CommandHandler', () =>
{
    let commandHandler: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}CommandHandler;
    let service: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}CommandHandler,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}CommandHandler>({{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}CommandHandler);
        service = module.get<{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Service>({{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Service);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Command(),
            )).toBe(undefined);
        });
    });
});