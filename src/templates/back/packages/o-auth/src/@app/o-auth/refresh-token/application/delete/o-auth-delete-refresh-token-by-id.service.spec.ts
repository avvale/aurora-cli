/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthIRefreshTokenRepository,
  oAuthMockRefreshTokenData,
  OAuthMockRefreshTokenRepository,
} from '@app/o-auth/refresh-token';
import { OAuthDeleteRefreshTokenByIdService } from '@app/o-auth/refresh-token/application/delete/o-auth-delete-refresh-token-by-id.service';
import { OAuthRefreshTokenId } from '@app/o-auth/refresh-token/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteRefreshTokenByIdService', () => {
  let service: OAuthDeleteRefreshTokenByIdService;
  let repository: OAuthIRefreshTokenRepository;
  let mockRepository: OAuthMockRefreshTokenRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        OAuthDeleteRefreshTokenByIdService,
        OAuthMockRefreshTokenRepository,
        {
          provide: OAuthIRefreshTokenRepository,
          useValue: {
            deleteById: (id) => {
              /**/
            },
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(OAuthDeleteRefreshTokenByIdService);
    repository = module.get(OAuthIRefreshTokenRepository);
    mockRepository = module.get(OAuthMockRefreshTokenRepository);
  });

  describe('main', () => {
    test('OAuthDeleteRefreshTokenByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete refreshToken and emit event', async () => {
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
          new OAuthRefreshTokenId(oAuthMockRefreshTokenData[0].id),
          {},
        ),
      ).toBe(undefined);
    });
  });
});
