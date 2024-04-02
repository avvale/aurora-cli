import { OAuthIAccessTokenRepository, OAuthMaxAccessTokenQuery, OAuthMockAccessTokenRepository } from '@app/o-auth/access-token';
import { OAuthMaxAccessTokenQueryHandler } from '@app/o-auth/access-token/application/max/o-auth-max-access-token.query-handler';
import { OAuthMaxAccessTokenService } from '@app/o-auth/access-token/application/max/o-auth-max-access-token.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMaxAccessTokenQueryHandler', () =>
{
    let queryHandler: OAuthMaxAccessTokenQueryHandler;
    let service: OAuthMaxAccessTokenService;
    let repository: OAuthMockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMaxAccessTokenQueryHandler,
                {
                    provide : OAuthIAccessTokenRepository,
                    useClass: OAuthMockAccessTokenRepository,
                },
                {
                    provide : OAuthMaxAccessTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMaxAccessTokenQueryHandler>(OAuthMaxAccessTokenQueryHandler);
        service = module.get<OAuthMaxAccessTokenService>(OAuthMaxAccessTokenService);
        repository = <OAuthMockAccessTokenRepository>module.get<OAuthIAccessTokenRepository>(OAuthIAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthMaxAccessTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new OAuthMaxAccessTokenQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
