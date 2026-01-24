/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthIApplicationClientRepository,
  oAuthMockApplicationClientData,
  OAuthMockApplicationClientRepository,
} from '@app/o-auth/application-client';
import { OAuthUpdateApplicationClientByIdService } from '@app/o-auth/application-client/application/update/o-auth-update-application-client-by-id.service';
import {
  OAuthApplicationClientApplicationId,
  OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationClientByIdService', () => {
  let service: OAuthUpdateApplicationClientByIdService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        OAuthUpdateApplicationClientByIdService,
        OAuthMockApplicationClientRepository,
        {
          provide: OAuthIApplicationClientRepository,
          useValue: {
            updateById: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(OAuthUpdateApplicationClientByIdService);
  });

  describe('main', () => {
    test('OAuthUpdateApplicationClientByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a applicationClient and emit event', async () => {
      expect(
        await service.main(
          {
            applicationId: new OAuthApplicationClientApplicationId(
              oAuthMockApplicationClientData[0].applicationId,
            ),
            clientId: new OAuthApplicationClientClientId(
              oAuthMockApplicationClientData[0].clientId,
            ),
          },
          {},
        ),
      ).toBe(undefined);
    });
  });
});
