/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthIApplicationClientRepository,
  OAuthMockApplicationClientRepository,
} from '@app/o-auth/application-client';
import { OAuthDeleteApplicationsClientsService } from '@app/o-auth/application-client/application/delete/o-auth-delete-applications-clients.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationsClientsService', () => {
  let service: OAuthDeleteApplicationsClientsService;
  let repository: OAuthIApplicationClientRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        OAuthDeleteApplicationsClientsService,
        OAuthMockApplicationClientRepository,
        {
          provide: OAuthIApplicationClientRepository,
          useValue: {
            get: () => {
              /**/
            },
            delete: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(OAuthDeleteApplicationsClientsService);
    repository = module.get(OAuthIApplicationClientRepository);
  });

  describe('main', () => {
    test('OAuthDeleteApplicationsClientsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete applicationClient and emit event', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      expect(await service.main({}, {})).toBe(undefined);
    });
  });
});
