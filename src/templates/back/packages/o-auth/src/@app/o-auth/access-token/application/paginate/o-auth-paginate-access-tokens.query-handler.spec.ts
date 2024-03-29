import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { OAuthPaginateAccessTokensQueryHandler } from './o-auth-paginate-access-tokens.query-handler';
import { OAuthMockAccessTokenRepository } from '@app/o-auth/access-token/infrastructure/mock/o-auth-mock-access-token.repository';
import { OAuthIAccessTokenRepository } from '@app/o-auth/access-token/domain/o-auth-access-token.repository';
import { OAuthAccessTokenMapper } from '@app/o-auth/access-token/domain/o-auth-access-token.mapper';
import { OAuthPaginateAccessTokensQuery } from './o-auth-paginate-access-tokens.query';
import { OAuthPaginateAccessTokensService } from './o-auth-paginate-access-tokens.service';

describe('OAuthPaginateAccessTokensQueryHandler', () =>
{
    let queryHandler: OAuthPaginateAccessTokensQueryHandler;
    let service: OAuthPaginateAccessTokensService;
    let repository: OAuthMockAccessTokenRepository;
    let mapper: OAuthAccessTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthPaginateAccessTokensQueryHandler,
                {
                    provide : OAuthIAccessTokenRepository,
                    useClass: OAuthMockAccessTokenRepository,
                },
                {
                    provide : OAuthPaginateAccessTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthPaginateAccessTokensQueryHandler>(OAuthPaginateAccessTokensQueryHandler);
        service = module.get<OAuthPaginateAccessTokensService>(OAuthPaginateAccessTokensService);
        repository = <OAuthMockAccessTokenRepository>module.get<OAuthIAccessTokenRepository>(OAuthIAccessTokenRepository);
        mapper = new OAuthAccessTokenMapper();
    });

    describe('main', () =>
    {
        test('OAuthPaginateAccessTokensQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accessTokens paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new OAuthPaginateAccessTokensQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
