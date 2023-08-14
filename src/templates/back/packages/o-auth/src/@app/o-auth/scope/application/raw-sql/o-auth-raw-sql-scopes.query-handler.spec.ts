import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthMockScopeRepository } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.repository';
import { OAuthIScopeRepository } from '@app/o-auth/scope/domain/o-auth-scope.repository';
import { OAuthScopeMapper } from '@app/o-auth/scope/domain/o-auth-scope.mapper';
import { OAuthRawSQLScopesQueryHandler } from './o-auth-raw-sql-scopes.query-handler';
import { OAuthRawSQLScopesQuery } from './o-auth-raw-sql-scopes.query';
import { OAuthRawSQLScopesService } from './o-auth-raw-sql-scopes.service';

describe('RawSQLScopesQueryHandler', () =>
{
    let queryHandler: OAuthRawSQLScopesQueryHandler;
    let service: OAuthRawSQLScopesService;
    let repository: OAuthMockScopeRepository;
    let mapper: OAuthScopeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthRawSQLScopesQueryHandler,
                {
                    provide : OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide : OAuthRawSQLScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthRawSQLScopesQueryHandler>(OAuthRawSQLScopesQueryHandler);
        service = module.get<OAuthRawSQLScopesService>(OAuthRawSQLScopesService);
        repository = <OAuthMockScopeRepository>module.get<OAuthIScopeRepository>(OAuthIScopeRepository);
        mapper = new OAuthScopeMapper();
    });

    describe('main', () =>
    {
        test('OAuthRawSQLScopesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scopes founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new OAuthRawSQLScopesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
