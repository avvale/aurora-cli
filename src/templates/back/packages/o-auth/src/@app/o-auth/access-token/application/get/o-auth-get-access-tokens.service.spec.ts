import {
  OAuthIAccessTokenRepository,
  OAuthMockAccessTokenRepository,
} from '@app/o-auth/access-token';
import { OAuthGetAccessTokensService } from '@app/o-auth/access-token/application/get/o-auth-get-access-tokens.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetAccessTokensService', () => {
  let service: OAuthGetAccessTokensService;
  let repository: OAuthIAccessTokenRepository;
  let mockRepository: OAuthMockAccessTokenRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        OAuthGetAccessTokensService,
        OAuthMockAccessTokenRepository,
        {
          provide: OAuthIAccessTokenRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(OAuthGetAccessTokensService);
    repository = module.get(OAuthIAccessTokenRepository);
    mockRepository = module.get(OAuthMockAccessTokenRepository);
  });

  describe('main', () => {
    test('GetAccessTokensService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get accessTokens', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});
