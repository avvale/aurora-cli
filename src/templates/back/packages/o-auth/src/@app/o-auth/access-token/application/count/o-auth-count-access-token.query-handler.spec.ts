import { OAuthCountAccessTokenQuery, OAuthIAccessTokenRepository, OAuthMockAccessTokenRepository } from '@app/o-auth/access-token';
import { OAuthCountAccessTokenQueryHandler } from '@app/o-auth/access-token/application/count/o-auth-count-access-token.query-handler';
import { OAuthCountAccessTokenService } from '@app/o-auth/access-token/application/count/o-auth-count-access-token.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCountAccessTokenQueryHandler', () =>
{
    let queryHandler: OAuthCountAccessTokenQueryHandler;
    let service: OAuthCountAccessTokenService;
    let repository: OAuthMockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCountAccessTokenQueryHandler,
                {
                    provide : OAuthIAccessTokenRepository,
                    useClass: OAuthMockAccessTokenRepository,
                },
                {
                    provide : OAuthCountAccessTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthCountAccessTokenQueryHandler>(OAuthCountAccessTokenQueryHandler);
        service = module.get<OAuthCountAccessTokenService>(OAuthCountAccessTokenService);
        repository = <OAuthMockAccessTokenRepository>module.get<OAuthIAccessTokenRepository>(OAuthIAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthCountAccessTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new OAuthCountAccessTokenQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
