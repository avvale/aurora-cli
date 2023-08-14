import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamMockBoundedContextRepository } from '@app/iam/bounded-context/infrastructure/mock/iam-mock-bounded-context.repository';
import { IamIBoundedContextRepository } from '@app/iam/bounded-context/domain/iam-bounded-context.repository';
import { IamBoundedContextMapper } from '@app/iam/bounded-context/domain/iam-bounded-context.mapper';
import { IamRawSQLBoundedContextsQueryHandler } from './iam-raw-sql-bounded-contexts.query-handler';
import { IamRawSQLBoundedContextsQuery } from './iam-raw-sql-bounded-contexts.query';
import { IamRawSQLBoundedContextsService } from './iam-raw-sql-bounded-contexts.service';

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
