import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from 'aurora-ts-core';

// custom items
import { PaginateScopesQueryHandler } from './paginate-scopes.query-handler';
import { MockScopeRepository } from '@apps/o-auth/scope/infrastructure/mock/mock-scope.repository';
import { IScopeRepository } from '@apps/o-auth/scope/domain/scope.repository';
import { ScopeMapper } from '@apps/o-auth/scope/domain/scope.mapper';
import { PaginateScopesQuery } from './paginate-scopes.query';
import { PaginateScopesService } from './paginate-scopes.service';

describe('PaginateScopesQueryHandler', () =>
{
    let queryHandler: PaginateScopesQueryHandler;
    let service: PaginateScopesService;
    let repository: MockScopeRepository;
    let mapper: ScopeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateScopesQueryHandler,
                {
                    provide : IScopeRepository,
                    useClass: MockScopeRepository,
                },
                {
                    provide : PaginateScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<PaginateScopesQueryHandler>(PaginateScopesQueryHandler);
        service         = module.get<PaginateScopesService>(PaginateScopesService);
        repository      = <MockScopeRepository>module.get<IScopeRepository>(IScopeRepository);
        mapper          = new ScopeMapper();
    });

    describe('main', () =>
    {
        test('PaginateScopesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scopes paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new PaginateScopesQuery(
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