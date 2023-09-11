import { IamBoundedContextMapper, IamIBoundedContextRepository, IamMockBoundedContextRepository, IamRawSQLBoundedContextsQuery } from '@app/iam/bounded-context';
import { IamRawSQLBoundedContextsQueryHandler } from '@app/iam/bounded-context/application/raw-sql/iam-raw-sql-bounded-contexts.query-handler';
import { IamRawSQLBoundedContextsService } from '@app/iam/bounded-context/application/raw-sql/iam-raw-sql-bounded-contexts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLBoundedContextsQueryHandler', () =>
{
    let queryHandler: IamRawSQLBoundedContextsQueryHandler;
    let service: IamRawSQLBoundedContextsService;
    let repository: IamMockBoundedContextRepository;
    let mapper: IamBoundedContextMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLBoundedContextsQueryHandler,
                {
                    provide : IamIBoundedContextRepository,
                    useClass: IamMockBoundedContextRepository,
                },
                {
                    provide : IamRawSQLBoundedContextsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamRawSQLBoundedContextsQueryHandler>(IamRawSQLBoundedContextsQueryHandler);
        service = module.get<IamRawSQLBoundedContextsService>(IamRawSQLBoundedContextsService);
        repository = <IamMockBoundedContextRepository>module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository);
        mapper = new IamBoundedContextMapper();
    });

    describe('main', () =>
    {
        test('IamRawSQLBoundedContextsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an boundedContexts founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamRawSQLBoundedContextsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
