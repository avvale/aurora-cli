/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthIClientRepository,
  OAuthMockClientRepository,
} from '@app/o-auth/client';
import { OAuthCreateClientsService } from '@app/o-auth/client/application/create/o-auth-create-clients.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateClientsService', () => {
  let service: OAuthCreateClientsService;
  let mockRepository: OAuthMockClientRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        OAuthCreateClientsService,
        OAuthMockClientRepository,
        {
          provide: OAuthIClientRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(OAuthCreateClientsService);
    mockRepository = module.get(OAuthMockClientRepository);
  });

  describe('main', () => {
    test('CreateClientsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create clients and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
