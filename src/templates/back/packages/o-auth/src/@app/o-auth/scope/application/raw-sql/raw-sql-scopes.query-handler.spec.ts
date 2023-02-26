import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockScopeRepository } from '@app/o-auth/scope/infrastructure/mock/mock-scope.repository';
import { IScopeRepository } from '@app/o-auth/scope/domain/scope.repository';
import { ScopeMapper } from '@app/o-auth/scope/domain/scope.mapper';
import { RawSQLScopesQueryHandler } from './raw-sql-scopes.query-handler';
import { RawSQLScopesQuery } from './raw-sql-scopes.query';
import { RawSQLScopesService } from './raw-sql-scopes.service';

describe('RawSQLScopesQueryHandler', () =>
{
    let queryHandler: RawSQLScopesQueryHandler;
    let service: RawSQLScopesService;
    let repository: MockScopeRepository;
    let mapper: ScopeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLScopesQueryHandler,
                {
                    provide : IScopeRepository,
                    useClass: MockScopeRepository,
                },
                {
                    provide : RawSQLScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLScopesQueryHandler>(RawSQLScopesQueryHandler);
        service         = module.get<RawSQLScopesService>(RawSQLScopesService);
        repository      = <MockScopeRepository>module.get<IScopeRepository>(IScopeRepository);
        mapper          = new ScopeMapper();
    });

    describe('main', () =>
    {
        test('RawSQLScopesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scopes founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLScopesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});