import {
  OAuthIAccessTokenRepository,
  oAuthMockAccessTokenData,
  OAuthMockAccessTokenRepository,
} from '@app/o-auth/access-token';
import { OAuthFindAccessTokenByIdService } from '@app/o-auth/access-token/application/find/o-auth-find-access-token-by-id.service';
import { OAuthAccessTokenId } from '@app/o-auth/access-token/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindAccessTokenByIdService', () => {
  let service: OAuthFindAccessTokenByIdService;
  let repository: OAuthIAccessTokenRepository;
  let mockRepository: OAuthMockAccessTokenRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        OAuthFindAccessTokenByIdService,
        OAuthMockAccessTokenRepository,
        {
          provide: OAuthIAccessTokenRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(OAuthFindAccessTokenByIdService);
    repository = module.get(OAuthIAccessTokenRepository);
    mockRepository = module.get(OAuthMockAccessTokenRepository);
  });

  describe('main', () => {
    test('FindAccessTokenByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find accessToken by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(
          new OAuthAccessTokenId(oAuthMockAccessTokenData[0].id),
        ),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
