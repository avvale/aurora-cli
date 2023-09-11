import { OAuthIRefreshTokenRepository, OAuthMockRefreshTokenRepository, OAuthRawSQLRefreshTokensQuery, OAuthRefreshTokenMapper } from '@app/o-auth/refresh-token';
import { OAuthRawSQLRefreshTokensQueryHandler } from '@app/o-auth/refresh-token/application/raw-sql/o-auth-raw-sql-refresh-tokens.query-handler';
import { OAuthRawSQLRefreshTokensService } from '@app/o-auth/refresh-token/application/raw-sql/o-auth-raw-sql-refresh-tokens.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLRefreshTokensQueryHandler', () =>
{
    let queryHandler: OAuthRawSQLRefreshTokensQueryHandler;
    let service: OAuthRawSQLRefreshTokensService;
    let repository: OAuthMockRefreshTokenRepository;
    let mapper: OAuthRefreshTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthRawSQLRefreshTokensQueryHandler,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useClass: OAuthMockRefreshTokenRepository,
                },
                {
                    provide : OAuthRawSQLRefreshTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthRawSQLRefreshTokensQueryHandler>(OAuthRawSQLRefreshTokensQueryHandler);
        service = module.get<OAuthRawSQLRefreshTokensService>(OAuthRawSQLRefreshTokensService);
        repository = <OAuthMockRefreshTokenRepository>module.get<OAuthIRefreshTokenRepository>(OAuthIRefreshTokenRepository);
        mapper = new OAuthRefreshTokenMapper();
    });

    describe('main', () =>
    {
        test('OAuthRawSQLRefreshTokensQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an refreshTokens founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new OAuthRawSQLRefreshTokensQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
