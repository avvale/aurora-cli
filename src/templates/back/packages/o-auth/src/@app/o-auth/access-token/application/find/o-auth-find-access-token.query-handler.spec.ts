import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindAccessTokenQueryHandler } from './o-auth-find-access-token.query-handler';
import { OAuthMockAccessTokenRepository } from '@app/o-auth/access-token/infrastructure/mock/o-auth-mock-access-token.repository';
import { OAuthIAccessTokenRepository } from '@app/o-auth/access-token/domain/o-auth-access-token.repository';
import { OAuthAccessTokenMapper } from '@app/o-auth/access-token/domain/o-auth-access-token.mapper';
import { OAuthFindAccessTokenQuery } from './o-auth-find-access-token.query';
import { OAuthFindAccessTokenService } from './o-auth-find-access-token.service';

describe('OAuthFindAccessTokenQueryHandler', () =>
{
    let queryHandler: OAuthFindAccessTokenQueryHandler;
    let service: OAuthFindAccessTokenService;
    let repository: OAuthMockAccessTokenRepository;
    let mapper: OAuthAccessTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindAccessTokenQueryHandler,
                {
                    provide : OAuthIAccessTokenRepository,
                    useClass: OAuthMockAccessTokenRepository,
                },
                {
                    provide : OAuthFindAccessTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthFindAccessTokenQueryHandler>(OAuthFindAccessTokenQueryHandler);
        service = module.get<OAuthFindAccessTokenService>(OAuthFindAccessTokenService);
        repository = <OAuthMockAccessTokenRepository>module.get<OAuthIAccessTokenRepository>(OAuthIAccessTokenRepository);
        mapper = new OAuthAccessTokenMapper();
    });

    describe('main', () =>
    {
        test('OAuthFindAccessTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accessToken founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new OAuthFindAccessTokenQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
