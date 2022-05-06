import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindScopeByIdQueryHandler } from './find-scope-by-id.query-handler';
import { MockScopeRepository } from '@apps/o-auth/scope/infrastructure/mock/mock-scope.repository';
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';
import { IScopeRepository } from '@apps/o-auth/scope/domain/scope.repository';
import { ScopeMapper } from '@apps/o-auth/scope/domain/scope.mapper';
import { FindScopeByIdQuery } from './find-scope-by-id.query';
import { FindScopeByIdService } from './find-scope-by-id.service';

describe('FindScopeByIdQueryHandler', () =>
{
    let queryHandler: FindScopeByIdQueryHandler;
    let service: FindScopeByIdService;
    let repository: MockScopeRepository;
    let mapper: ScopeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindScopeByIdQueryHandler,
                {
                    provide : IScopeRepository,
                    useClass: MockScopeRepository,
                },
                {
                    provide : FindScopeByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindScopeByIdQueryHandler>(FindScopeByIdQueryHandler);
        service         = module.get<FindScopeByIdService>(FindScopeByIdService);
        repository      = <MockScopeRepository>module.get<IScopeRepository>(IScopeRepository);
        mapper          = new ScopeMapper();
    });

    describe('main', () =>
    {
        test('FindScopeByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scope founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindScopeByIdQuery(
                    scopes[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});