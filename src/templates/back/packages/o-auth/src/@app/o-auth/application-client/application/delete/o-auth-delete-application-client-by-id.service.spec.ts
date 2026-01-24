/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthIApplicationClientRepository,
  oAuthMockApplicationClientData,
  OAuthMockApplicationClientRepository,
} from '@app/o-auth/application-client';
import { OAuthDeleteApplicationClientByIdService } from '@app/o-auth/application-client/application/delete/o-auth-delete-application-client-by-id.service';
import { OAuthApplicationClientId } from '@app/o-auth/application-client/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationClientByIdService', () => {
  let service: OAuthDeleteApplicationClientByIdService;
  let repository: OAuthIApplicationClientRepository;
  let mockRepository: OAuthMockApplicationClientRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        OAuthDeleteApplicationClientByIdService,
        OAuthMockApplicationClientRepository,
        {
          provide: OAuthIApplicationClientRepository,
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

    service = module.get(OAuthDeleteApplicationClientByIdService);
    repository = module.get(OAuthIApplicationClientRepository);
    mockRepository = module.get(OAuthMockApplicationClientRepository);
  });

  describe('main', () => {
    test('OAuthDeleteApplicationClientByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete applicationClient and emit event', async () => {
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
          new OAuthApplicationClientId(oAuthMockApplicationClientData[0].id),
          {},
        ),
      ).toBe(undefined);
    });
  });
});
