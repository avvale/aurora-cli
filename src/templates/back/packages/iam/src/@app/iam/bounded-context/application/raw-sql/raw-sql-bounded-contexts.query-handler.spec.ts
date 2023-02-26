import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockBoundedContextRepository } from '@app/iam/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { IBoundedContextRepository } from '@app/iam/bounded-context/domain/bounded-context.repository';
import { BoundedContextMapper } from '@app/iam/bounded-context/domain/bounded-context.mapper';
import { RawSQLBoundedContextsQueryHandler } from './raw-sql-bounded-contexts.query-handler';
import { RawSQLBoundedContextsQuery } from './raw-sql-bounded-contexts.query';
import { RawSQLBoundedContextsService } from './raw-sql-bounded-contexts.service';

describe('RawSQLBoundedContextsQueryHandler', () =>
{
    let queryHandler: RawSQLBoundedContextsQueryHandler;
    let service: RawSQLBoundedContextsService;
    let repository: MockBoundedContextRepository;
    let mapper: BoundedContextMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLBoundedContextsQueryHandler,
                {
                    provide : IBoundedContextRepository,
                    useClass: MockBoundedContextRepository,
                },
                {
                    provide : RawSQLBoundedContextsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLBoundedContextsQueryHandler>(RawSQLBoundedContextsQueryHandler);
        service         = module.get<RawSQLBoundedContextsService>(RawSQLBoundedContextsService);
        repository      = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);
        mapper          = new BoundedContextMapper();
    });

    describe('main', () =>
    {
        test('RawSQLBoundedContextsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an boundedContexts founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLBoundedContextsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});