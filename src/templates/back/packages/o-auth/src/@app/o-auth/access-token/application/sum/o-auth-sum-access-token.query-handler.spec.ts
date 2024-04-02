import { OAuthIAccessTokenRepository, OAuthMockAccessTokenRepository, OAuthSumAccessTokenQuery } from '@app/o-auth/access-token';
import { OAuthSumAccessTokenQueryHandler } from '@app/o-auth/access-token/application/sum/o-auth-sum-access-token.query-handler';
import { OAuthSumAccessTokenService } from '@app/o-auth/access-token/application/sum/o-auth-sum-access-token.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthSumAccessTokenQueryHandler', () =>
{
    let queryHandler: OAuthSumAccessTokenQueryHandler;
    let service: OAuthSumAccessTokenService;
    let repository: OAuthMockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthSumAccessTokenQueryHandler,
                {
                    provide : OAuthIAccessTokenRepository,
                    useClass: OAuthMockAccessTokenRepository,
                },
                {
                    provide : OAuthSumAccessTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthSumAccessTokenQueryHandler>(OAuthSumAccessTokenQueryHandler);
        service = module.get<OAuthSumAccessTokenService>(OAuthSumAccessTokenService);
        repository = <OAuthMockAccessTokenRepository>module.get<OAuthIAccessTokenRepository>(OAuthIAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthSumAccessTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new OAuthSumAccessTokenQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
