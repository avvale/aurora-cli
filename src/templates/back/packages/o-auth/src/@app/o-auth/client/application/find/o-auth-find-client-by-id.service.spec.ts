import {
  OAuthIClientRepository,
  oAuthMockClientData,
  OAuthMockClientRepository,
} from '@app/o-auth/client';
import { OAuthFindClientByIdService } from '@app/o-auth/client/application/find/o-auth-find-client-by-id.service';
import { OAuthClientId } from '@app/o-auth/client/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindClientByIdService', () => {
  let service: OAuthFindClientByIdService;
  let repository: OAuthIClientRepository;
  let mockRepository: OAuthMockClientRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        OAuthFindClientByIdService,
        OAuthMockClientRepository,
        {
          provide: OAuthIClientRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(OAuthFindClientByIdService);
    repository = module.get(OAuthIClientRepository);
    mockRepository = module.get(OAuthMockClientRepository);
  });

  describe('main', () => {
    test('FindClientByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find client by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new OAuthClientId(oAuthMockClientData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
