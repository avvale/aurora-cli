{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (
                object
                    items=
                    (
                        array
                            (sumStrings (toPascalCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Repository')
                            (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository')
                            (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Mapper')
                            (sumStrings (toPascalCase schema.boundedContextName) 'Find' (toPascalCase schema.moduleName) 'Query')
                    )
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
            (
                object
                    items=(sumStrings (toPascalCase schema.boundedContextName) 'Find' (toPascalCase schema.moduleName) 'Service')
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.service')
            )
            (
                object
                    items=(sumStrings (toPascalCase schema.boundedContextName) 'Find' (toPascalCase schema.moduleName) 'QueryHandler')
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.query-handler')
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}QueryHandler', () =>
{
    let queryHandler: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}QueryHandler;
    let service: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Service;
    let repository: {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository;
    let mapper: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}QueryHandler,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
                    useClass: {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository,
                },
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}QueryHandler>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}QueryHandler);
        service = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Service>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Service);
        repository = <{{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository>module.get<{{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository>({{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository);
        mapper = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleName }} founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Query(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
