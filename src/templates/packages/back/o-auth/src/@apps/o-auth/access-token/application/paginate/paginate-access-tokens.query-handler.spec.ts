import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from 'aurora-ts-core';

// custom items
import { PaginateAccessTokensQueryHandler } from './paginate-access-tokens.query-handler';
import { MockAccessTokenRepository } from '@apps/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { IAccessTokenRepository } from '@apps/o-auth/access-token/domain/access-token.repository';
import { AccessTokenMapper } from '@apps/o-auth/access-token/domain/access-token.mapper';
import { PaginateAccessTokensQuery } from './paginate-access-tokens.query';
import { PaginateAccessTokensService } from './paginate-access-tokens.service';

describe('PaginateAccessTokensQueryHandler', () =>
{
    let queryHandler: PaginateAccessTokensQueryHandler;
    let service: PaginateAccessTokensService;
    let repository: MockAccessTokenRepository;
    let mapper: AccessTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateAccessTokensQueryHandler,
                {
                    provide : IAccessTokenRepository,
                    useClass: MockAccessTokenRepository,
                },
                {
                    provide : PaginateAccessTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<PaginateAccessTokensQueryHandler>(PaginateAccessTokensQueryHandler);
        service         = module.get<PaginateAccessTokensService>(PaginateAccessTokensService);
        repository      = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);
        mapper          = new AccessTokenMapper();
    });

    describe('main', () =>
    {
        test('PaginateAccessTokensQueryHandler should be defined', () =>
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
                new PaginateAccessTokensQuery(
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