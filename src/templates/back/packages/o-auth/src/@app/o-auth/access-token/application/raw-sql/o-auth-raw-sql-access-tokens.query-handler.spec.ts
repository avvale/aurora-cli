import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthMockAccessTokenRepository } from '@app/o-auth/access-token/infrastructure/mock/o-auth-mock-access-token.repository';
import { OAuthIAccessTokenRepository } from '@app/o-auth/access-token/domain/o-auth-access-token.repository';
import { OAuthAccessTokenMapper } from '@app/o-auth/access-token/domain/o-auth-access-token.mapper';
import { OAuthRawSQLAccessTokensQueryHandler } from './o-auth-raw-sql-access-tokens.query-handler';
import { OAuthRawSQLAccessTokensQuery } from './o-auth-raw-sql-access-tokens.query';
import { OAuthRawSQLAccessTokensService } from './o-auth-raw-sql-access-tokens.service';

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
