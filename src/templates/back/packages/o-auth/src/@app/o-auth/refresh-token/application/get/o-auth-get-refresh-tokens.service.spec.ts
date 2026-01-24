import {
  OAuthIRefreshTokenRepository,
  OAuthMockRefreshTokenRepository,
} from '@app/o-auth/refresh-token';
import { OAuthGetRefreshTokensService } from '@app/o-auth/refresh-token/application/get/o-auth-get-refresh-tokens.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetRefreshTokensService', () => {
  let service: OAuthGetRefreshTokensService;
  let repository: OAuthIRefreshTokenRepository;
  let mockRepository: OAuthMockRefreshTokenRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        OAuthGetRefreshTokensService,
        OAuthMockRefreshTokenRepository,
        {
          provide: OAuthIRefreshTokenRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(OAuthGetRefreshTokensService);
    repository = module.get(OAuthIRefreshTokenRepository);
    mockRepository = module.get(OAuthMockRefreshTokenRepository);
  });

  describe('main', () => {
    test('GetRefreshTokensService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get refreshTokens', async () => {
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
