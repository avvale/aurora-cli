import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { IamPaginateBoundedContextsQueryHandler } from './iam-paginate-bounded-contexts.query-handler';
import { IamMockBoundedContextRepository } from '@app/iam/bounded-context/infrastructure/mock/iam-mock-bounded-context.repository';
import { IamIBoundedContextRepository } from '@app/iam/bounded-context/domain/iam-bounded-context.repository';
import { IamBoundedContextMapper } from '@app/iam/bounded-context/domain/iam-bounded-context.mapper';
import { IamPaginateBoundedContextsQuery } from './iam-paginate-bounded-contexts.query';
import { IamPaginateBoundedContextsService } from './iam-paginate-bounded-contexts.service';

describe('IamPaginateBoundedContextsQueryHandler', () =>
{
    let queryHandler: IamPaginateBoundedContextsQueryHandler;
    let service: IamPaginateBoundedContextsService;
    let repository: IamMockBoundedContextRepository;
    let mapper: IamBoundedContextMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamPaginateBoundedContextsQueryHandler,
                {
                    provide : IamIBoundedContextRepository,
                    useClass: IamMockBoundedContextRepository,
                },
                {
                    provide : IamPaginateBoundedContextsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamPaginateBoundedContextsQueryHandler>(IamPaginateBoundedContextsQueryHandler);
        service = module.get<IamPaginateBoundedContextsService>(IamPaginateBoundedContextsService);
        repository = <IamMockBoundedContextRepository>module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository);
        mapper = new IamBoundedContextMapper();
    });

    describe('main', () =>
    {
        test('IamPaginateBoundedContextsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an boundedContexts paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new IamPaginateBoundedContextsQuery(
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
