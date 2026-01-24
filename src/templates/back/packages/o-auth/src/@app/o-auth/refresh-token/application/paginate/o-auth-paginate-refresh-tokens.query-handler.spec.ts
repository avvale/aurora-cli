import {
  OAuthIRefreshTokenRepository,
  OAuthMockRefreshTokenRepository,
  OAuthPaginateRefreshTokensQuery,
} from '@app/o-auth/refresh-token';
import { OAuthPaginateRefreshTokensQueryHandler } from '@app/o-auth/refresh-token/application/paginate/o-auth-paginate-refresh-tokens.query-handler';
import { OAuthPaginateRefreshTokensService } from '@app/o-auth/refresh-token/application/paginate/o-auth-paginate-refresh-tokens.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateRefreshTokensQueryHandler', () => {
  let queryHandler: OAuthPaginateRefreshTokensQueryHandler;
  let service: OAuthPaginateRefreshTokensService;
  let repository: OAuthMockRefreshTokenRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthPaginateRefreshTokensQueryHandler,
        {
          provide: OAuthIRefreshTokenRepository,
          useClass: OAuthMockRefreshTokenRepository,
        },
        {
          provide: OAuthPaginateRefreshTokensService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<OAuthPaginateRefreshTokensQueryHandler>(
      OAuthPaginateRefreshTokensQueryHandler,
    );
    service = module.get<OAuthPaginateRefreshTokensService>(
      OAuthPaginateRefreshTokensService,
    );
    repository = <OAuthMockRefreshTokenRepository>(
      module.get<OAuthIRefreshTokenRepository>(OAuthIRefreshTokenRepository)
    );
  });

  describe('main', () => {
    test('OAuthPaginateRefreshTokensQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an refreshTokens paginated', async () => {
      jest.spyOn(service, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              count: 10,
              total: 100,
              rows: repository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await queryHandler.execute(
          new OAuthPaginateRefreshTokensQuery({
            offset: 0,
            limit: 10,
          }),
        ),
      ).toStrictEqual(
        new PaginationResponse(
          100,
          10,
          repository.collectionSource.slice(0, 10).map((item) => item.toDTO()),
        ),
      );
    });
  });
});
