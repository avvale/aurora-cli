import { OAuthAccessTokenMapper, OAuthIAccessTokenRepository, OAuthMockAccessTokenRepository, OAuthRawSQLAccessTokensQuery } from '@app/o-auth/access-token';
import { OAuthRawSQLAccessTokensQueryHandler } from '@app/o-auth/access-token/application/raw-sql/o-auth-raw-sql-access-tokens.query-handler';
import { OAuthRawSQLAccessTokensService } from '@app/o-auth/access-token/application/raw-sql/o-auth-raw-sql-access-tokens.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLAccessTokensQueryHandler', () =>
{
    let queryHandler: OAuthRawSQLAccessTokensQueryHandler;
    let service: OAuthRawSQLAccessTokensService;
    let repository: OAuthMockAccessTokenRepository;
    let mapper: OAuthAccessTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthRawSQLAccessTokensQueryHandler,
                {
                    provide : OAuthIAccessTokenRepository,
                    useClass: OAuthMockAccessTokenRepository,
                },
                {
                    provide : OAuthRawSQLAccessTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthRawSQLAccessTokensQueryHandler>(OAuthRawSQLAccessTokensQueryHandler);
        service = module.get<OAuthRawSQLAccessTokensService>(OAuthRawSQLAccessTokensService);
        repository = <OAuthMockAccessTokenRepository>module.get<OAuthIAccessTokenRepository>(OAuthIAccessTokenRepository);
        mapper = new OAuthAccessTokenMapper();
    });

    describe('main', () =>
    {
        test('OAuthRawSQLAccessTokensQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accessTokens founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new OAuthRawSQLAccessTokensQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
