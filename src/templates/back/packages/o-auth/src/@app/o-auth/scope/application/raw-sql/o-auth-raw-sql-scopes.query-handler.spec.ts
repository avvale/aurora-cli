import { OAuthIScopeRepository, OAuthMockScopeRepository, OAuthRawSQLScopesQuery, OAuthScopeMapper } from '@app/o-auth/scope';
import { OAuthRawSQLScopesQueryHandler } from '@app/o-auth/scope/application/raw-sql/o-auth-raw-sql-scopes.query-handler';
import { OAuthRawSQLScopesService } from '@app/o-auth/scope/application/raw-sql/o-auth-raw-sql-scopes.service';
import { Test, TestingModule } from '@nestjs/testing';

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
