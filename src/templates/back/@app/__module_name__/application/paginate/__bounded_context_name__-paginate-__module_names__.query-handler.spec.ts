{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (object items=(array 'PaginationResponse') path=config.auroraCorePackage)
            (
                object
                    items=
                    (
                        array
                            (sumStrings (toPascalCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Repository')
                            (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository')
                            (sumStrings (toPascalCase schema.boundedContextName) 'Paginate' (toPascalCase schema.moduleNames) 'Query')
                    )
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
            (
                object
                    items=(sumStrings (toPascalCase schema.boundedContextName) 'Paginate' (toPascalCase schema.moduleNames) 'Service')
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/paginate/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.service')
            )
            (
                object
                    items=(sumStrings (toPascalCase schema.boundedContextName) 'Paginate' (toPascalCase schema.moduleNames) 'QueryHandler')
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/paginate/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.query-handler')
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}QueryHandler', () =>
{
    let queryHandler: {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}QueryHandler;
    let service: {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Service;
    let repository: {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}QueryHandler,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
                    useClass: {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository,
                },
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<{{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}QueryHandler>({{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}QueryHandler);
        service = module.get<{{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Service>({{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Service);
        repository = <{{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository>module.get<{{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository>({{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleNames }} paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Query(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
