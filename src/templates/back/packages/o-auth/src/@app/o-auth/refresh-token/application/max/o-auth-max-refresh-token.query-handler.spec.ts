import { OAuthIRefreshTokenRepository, OAuthMaxRefreshTokenQuery, OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token';
import { OAuthMaxRefreshTokenQueryHandler } from '@app/o-auth/refresh-token/application/max/o-auth-max-refresh-token.query-handler';
import { OAuthMaxRefreshTokenService } from '@app/o-auth/refresh-token/application/max/o-auth-max-refresh-token.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMaxRefreshTokenQueryHandler', () =>
{
    let queryHandler: OAuthMaxRefreshTokenQueryHandler;
    let service: OAuthMaxRefreshTokenService;
    let repository: OAuthMockRefreshTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMaxRefreshTokenQueryHandler,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useClass: OAuthMockRefreshTokenRepository,
                },
                {
                    provide : OAuthMaxRefreshTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMaxRefreshTokenQueryHandler>(OAuthMaxRefreshTokenQueryHandler);
        service = module.get<OAuthMaxRefreshTokenService>(OAuthMaxRefreshTokenService);
        repository = <OAuthMockRefreshTokenRepository>module.get<OAuthIRefreshTokenRepository>(OAuthIRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthMaxRefreshTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new OAuthMaxRefreshTokenQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
