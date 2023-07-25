{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (object items=(array 'ICommandBus' 'IQueryBus') path=config.auroraCorePackage)
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleNames) 'Handler') path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
            (object items=(sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
    )
~}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler', () =>
{
    let handler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data created', async () =>
        {
            expect(await handler.main({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data)).toBe(true);
        });
    });
});