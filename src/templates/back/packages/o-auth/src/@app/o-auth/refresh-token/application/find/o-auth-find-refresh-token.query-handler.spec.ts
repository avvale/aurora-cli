import {
  OAuthFindRefreshTokenQuery,
  OAuthIRefreshTokenRepository,
  OAuthMockRefreshTokenRepository,
  OAuthRefreshTokenMapper,
} from '@app/o-auth/refresh-token';
import { OAuthFindRefreshTokenQueryHandler } from '@app/o-auth/refresh-token/application/find/o-auth-find-refresh-token.query-handler';
import { OAuthFindRefreshTokenService } from '@app/o-auth/refresh-token/application/find/o-auth-find-refresh-token.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindRefreshTokenQueryHandler', () => {
  let queryHandler: OAuthFindRefreshTokenQueryHandler;
  let service: OAuthFindRefreshTokenService;
  let repository: OAuthMockRefreshTokenRepository;
  let mapper: OAuthRefreshTokenMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthFindRefreshTokenQueryHandler,
        {
          provide: OAuthIRefreshTokenRepository,
          useClass: OAuthMockRefreshTokenRepository,
        },
        {
          provide: OAuthFindRefreshTokenService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<OAuthFindRefreshTokenQueryHandler>(
      OAuthFindRefreshTokenQueryHandler,
    );
    service = module.get<OAuthFindRefreshTokenService>(
      OAuthFindRefreshTokenService,
    );
    repository = <OAuthMockRefreshTokenRepository>(
      module.get<OAuthIRefreshTokenRepository>(OAuthIRefreshTokenRepository)
    );
    mapper = new OAuthRefreshTokenMapper();
  });

  describe('main', () => {
    test('OAuthFindRefreshTokenQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an refreshToken founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new OAuthFindRefreshTokenQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
