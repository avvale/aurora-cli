import { OAuthIAccessTokenRepository, OAuthMinAccessTokenQuery, OAuthMockAccessTokenRepository } from '@app/o-auth/access-token';
import { OAuthMinAccessTokenQueryHandler } from '@app/o-auth/access-token/application/min/o-auth-min-access-token.query-handler';
import { OAuthMinAccessTokenService } from '@app/o-auth/access-token/application/min/o-auth-min-access-token.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMinAccessTokenQueryHandler', () =>
{
    let queryHandler: OAuthMinAccessTokenQueryHandler;
    let service: OAuthMinAccessTokenService;
    let repository: OAuthMockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMinAccessTokenQueryHandler,
                {
                    provide : OAuthIAccessTokenRepository,
                    useClass: OAuthMockAccessTokenRepository,
                },
                {
                    provide : OAuthMinAccessTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMinAccessTokenQueryHandler>(OAuthMinAccessTokenQueryHandler);
        service = module.get<OAuthMinAccessTokenService>(OAuthMinAccessTokenService);
        repository = <OAuthMockAccessTokenRepository>module.get<OAuthIAccessTokenRepository>(OAuthIAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthMinAccessTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new OAuthMinAccessTokenQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
