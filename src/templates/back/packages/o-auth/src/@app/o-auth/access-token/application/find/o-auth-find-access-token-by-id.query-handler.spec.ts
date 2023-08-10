import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindAccessTokenByIdQueryHandler } from './o-auth-find-access-token-by-id.query-handler';
import { OAuthMockAccessTokenRepository } from '@app/o-auth/access-token/infrastructure/mock/o-auth-mock-access-token.repository';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token/infrastructure/mock/o-auth-mock-access-token.data';
import { OAuthIAccessTokenRepository } from '@app/o-auth/access-token/domain/o-auth-access-token.repository';
import { OAuthAccessTokenMapper } from '@app/o-auth/access-token/domain/o-auth-access-token.mapper';
import { OAuthFindAccessTokenByIdQuery } from './o-auth-find-access-token-by-id.query';
import { OAuthFindAccessTokenByIdService } from './o-auth-find-access-token-by-id.service';

describe('OAuthFindAccessTokenByIdQueryHandler', () =>
{
    let queryHandler: OAuthFindAccessTokenByIdQueryHandler;
    let service: OAuthFindAccessTokenByIdService;
    let repository: OAuthMockAccessTokenRepository;
    let mapper: OAuthAccessTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindAccessTokenByIdQueryHandler,
                {
                    provide : OAuthIAccessTokenRepository,
                    useClass: OAuthMockAccessTokenRepository,
                },
                {
                    provide : OAuthFindAccessTokenByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthFindAccessTokenByIdQueryHandler>(OAuthFindAccessTokenByIdQueryHandler);
        service = module.get<OAuthFindAccessTokenByIdService>(OAuthFindAccessTokenByIdService);
        repository = <OAuthMockAccessTokenRepository>module.get<OAuthIAccessTokenRepository>(OAuthIAccessTokenRepository);
        mapper = new OAuthAccessTokenMapper();
    });

    describe('main', () =>
    {
        test('FindAccessTokenByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accessToken founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new OAuthFindAccessTokenByIdQuery(
                    oAuthMockAccessTokenData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
