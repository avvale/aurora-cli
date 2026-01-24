import {
  OAuthAccessTokenMapper,
  OAuthFindAccessTokenByIdQuery,
  OAuthIAccessTokenRepository,
  oAuthMockAccessTokenData,
  OAuthMockAccessTokenRepository,
} from '@app/o-auth/access-token';
import { OAuthFindAccessTokenByIdQueryHandler } from '@app/o-auth/access-token/application/find/o-auth-find-access-token-by-id.query-handler';
import { OAuthFindAccessTokenByIdService } from '@app/o-auth/access-token/application/find/o-auth-find-access-token-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindAccessTokenByIdQueryHandler', () => {
  let queryHandler: OAuthFindAccessTokenByIdQueryHandler;
  let service: OAuthFindAccessTokenByIdService;
  let repository: OAuthMockAccessTokenRepository;
  let mapper: OAuthAccessTokenMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthFindAccessTokenByIdQueryHandler,
        {
          provide: OAuthIAccessTokenRepository,
          useClass: OAuthMockAccessTokenRepository,
        },
        {
          provide: OAuthFindAccessTokenByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<OAuthFindAccessTokenByIdQueryHandler>(
      OAuthFindAccessTokenByIdQueryHandler,
    );
    service = module.get<OAuthFindAccessTokenByIdService>(
      OAuthFindAccessTokenByIdService,
    );
    repository = <OAuthMockAccessTokenRepository>(
      module.get<OAuthIAccessTokenRepository>(OAuthIAccessTokenRepository)
    );
    mapper = new OAuthAccessTokenMapper();
  });

  describe('main', () => {
    test('FindAccessTokenByIdQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an accessToken founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(
          new OAuthFindAccessTokenByIdQuery(oAuthMockAccessTokenData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
