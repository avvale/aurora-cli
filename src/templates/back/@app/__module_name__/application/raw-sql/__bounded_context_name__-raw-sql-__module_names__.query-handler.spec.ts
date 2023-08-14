{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Repository')
                        (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository')
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Mapper')
                        (sumStrings (toPascalCase schema.boundedContextName) 'RawSQL' (toPascalCase schema.moduleNames) 'QueryHandler')
                        (sumStrings (toPascalCase schema.boundedContextName) 'RawSQL' (toPascalCase schema.moduleNames) 'Query')
                        (sumStrings (toPascalCase schema.boundedContextName) 'RawSQL' (toPascalCase schema.moduleNames) 'Service')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
describe('RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler', () =>
{
    let queryHandler: {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler;
    let service: {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Service;
    let repository: {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository;
    let mapper: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
                    useClass: {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository,
                },
                {
                    provide : {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<{{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler>({{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler);
        service = module.get<{{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Service>({{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Service);
        repository = <{{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository>module.get<{{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository>({{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository);
        mapper = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleNames }} founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Query(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
