import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from 'aurora-ts-core';

// custom items
import { PaginateBoundedContextsQueryHandler } from './paginate-bounded-contexts.query-handler';
import { MockBoundedContextRepository } from '../../../../../@apps/iam/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { IBoundedContextRepository } from '../../../../../@apps/iam/bounded-context/domain/bounded-context.repository';
import { BoundedContextMapper } from '../../../../../@apps/iam/bounded-context/domain/bounded-context.mapper';
import { PaginateBoundedContextsQuery } from './paginate-bounded-contexts.query';
import { PaginateBoundedContextsService } from './paginate-bounded-contexts.service';

describe('PaginateBoundedContextsQueryHandler', () =>
{
    let queryHandler: PaginateBoundedContextsQueryHandler;
    let service: PaginateBoundedContextsService;
    let repository: MockBoundedContextRepository;
    let mapper: BoundedContextMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateBoundedContextsQueryHandler,
                {
                    provide : IBoundedContextRepository,
                    useClass: MockBoundedContextRepository
                },
                {
                    provide : PaginateBoundedContextsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateBoundedContextsQueryHandler>(PaginateBoundedContextsQueryHandler);
        service         = module.get<PaginateBoundedContextsService>(PaginateBoundedContextsService);
        repository      = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);
        mapper          = new BoundedContextMapper();
    });

    describe('main', () =>
    {
        test('PaginateBoundedContextsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an boundedContexts paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateBoundedContextsQuery(
                    {
                        offset: 0,
                        limit: 10
                    }
                )
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO())
                )
            );
        });
    });
});