import { OAuthIRefreshTokenRepository, OAuthMockRefreshTokenRepository, OAuthSumRefreshTokenQuery } from '@app/o-auth/refresh-token';
import { OAuthSumRefreshTokenQueryHandler } from '@app/o-auth/refresh-token/application/sum/o-auth-sum-refresh-token.query-handler';
import { OAuthSumRefreshTokenService } from '@app/o-auth/refresh-token/application/sum/o-auth-sum-refresh-token.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthSumRefreshTokenQueryHandler', () =>
{
    let queryHandler: OAuthSumRefreshTokenQueryHandler;
    let service: OAuthSumRefreshTokenService;
    let repository: OAuthMockRefreshTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthSumRefreshTokenQueryHandler,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useClass: OAuthMockRefreshTokenRepository,
                },
                {
                    provide : OAuthSumRefreshTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthSumRefreshTokenQueryHandler>(OAuthSumRefreshTokenQueryHandler);
        service = module.get<OAuthSumRefreshTokenService>(OAuthSumRefreshTokenService);
        repository = <OAuthMockRefreshTokenRepository>module.get<OAuthIRefreshTokenRepository>(OAuthIRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthSumRefreshTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new OAuthSumRefreshTokenQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
