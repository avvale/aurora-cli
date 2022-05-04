import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetScopesQueryHandler } from './get-scopes.query-handler';
import { MockScopeRepository } from '../../../../../@apps/o-auth/scope/infrastructure/mock/mock-scope.repository';
import { IScopeRepository } from '../../../../../@apps/o-auth/scope/domain/scope.repository';
import { ScopeMapper } from '../../../../../@apps/o-auth/scope/domain/scope.mapper';
import { GetScopesQuery } from './get-scopes.query';
import { GetScopesService } from './get-scopes.service';

describe('GetScopesQueryHandler', () =>
{
    let queryHandler: GetScopesQueryHandler;
    let service: GetScopesService;
    let repository: MockScopeRepository;
    let mapper: ScopeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetScopesQueryHandler,
                {
                    provide : IScopeRepository,
                    useClass: MockScopeRepository,
                },
                {
                    provide : GetScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<GetScopesQueryHandler>(GetScopesQueryHandler);
        service         = module.get<GetScopesService>(GetScopesService);
        repository      = <MockScopeRepository>module.get<IScopeRepository>(IScopeRepository);
        mapper          = new ScopeMapper();
    });

    describe('main', () =>
    {
        test('GetScopesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scopes founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetScopesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});