import {
  OAuthIScopeRepository,
  OAuthMockScopeRepository,
} from '@app/o-auth/scope';
import { OAuthGetScopesService } from '@app/o-auth/scope/application/get/o-auth-get-scopes.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetScopesService', () => {
  let service: OAuthGetScopesService;
  let repository: OAuthIScopeRepository;
  let mockRepository: OAuthMockScopeRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        OAuthGetScopesService,
        OAuthMockScopeRepository,
        {
          provide: OAuthIScopeRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(OAuthGetScopesService);
    repository = module.get(OAuthIScopeRepository);
    mockRepository = module.get(OAuthMockScopeRepository);
  });

  describe('main', () => {
    test('GetScopesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get scopes', async () => {
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
