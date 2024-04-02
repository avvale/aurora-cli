import { OAuthCountRefreshTokenQuery, OAuthIRefreshTokenRepository, OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token';
import { OAuthCountRefreshTokenQueryHandler } from '@app/o-auth/refresh-token/application/count/o-auth-count-refresh-token.query-handler';
import { OAuthCountRefreshTokenService } from '@app/o-auth/refresh-token/application/count/o-auth-count-refresh-token.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCountRefreshTokenQueryHandler', () =>
{
    let queryHandler: OAuthCountRefreshTokenQueryHandler;
    let service: OAuthCountRefreshTokenService;
    let repository: OAuthMockRefreshTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCountRefreshTokenQueryHandler,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useClass: OAuthMockRefreshTokenRepository,
                },
                {
                    provide : OAuthCountRefreshTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthCountRefreshTokenQueryHandler>(OAuthCountRefreshTokenQueryHandler);
        service = module.get<OAuthCountRefreshTokenService>(OAuthCountRefreshTokenService);
        repository = <OAuthMockRefreshTokenRepository>module.get<OAuthIRefreshTokenRepository>(OAuthIRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthCountRefreshTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new OAuthCountRefreshTokenQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
