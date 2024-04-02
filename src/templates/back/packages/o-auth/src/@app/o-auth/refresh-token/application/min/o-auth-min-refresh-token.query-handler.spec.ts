import { OAuthIRefreshTokenRepository, OAuthMinRefreshTokenQuery, OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token';
import { OAuthMinRefreshTokenQueryHandler } from '@app/o-auth/refresh-token/application/min/o-auth-min-refresh-token.query-handler';
import { OAuthMinRefreshTokenService } from '@app/o-auth/refresh-token/application/min/o-auth-min-refresh-token.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMinRefreshTokenQueryHandler', () =>
{
    let queryHandler: OAuthMinRefreshTokenQueryHandler;
    let service: OAuthMinRefreshTokenService;
    let repository: OAuthMockRefreshTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMinRefreshTokenQueryHandler,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useClass: OAuthMockRefreshTokenRepository,
                },
                {
                    provide : OAuthMinRefreshTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMinRefreshTokenQueryHandler>(OAuthMinRefreshTokenQueryHandler);
        service = module.get<OAuthMinRefreshTokenService>(OAuthMinRefreshTokenService);
        repository = <OAuthMockRefreshTokenRepository>module.get<OAuthIRefreshTokenRepository>(OAuthIRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthMinRefreshTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new OAuthMinRefreshTokenQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
