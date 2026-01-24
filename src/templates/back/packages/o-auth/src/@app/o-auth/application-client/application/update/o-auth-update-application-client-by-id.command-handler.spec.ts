import {
  oAuthMockApplicationClientData,
  OAuthUpdateApplicationClientByIdCommand,
} from '@app/o-auth/application-client';
import { OAuthUpdateApplicationClientByIdCommandHandler } from '@app/o-auth/application-client/application/update/o-auth-update-application-client-by-id.command-handler';
import { OAuthUpdateApplicationClientByIdService } from '@app/o-auth/application-client/application/update/o-auth-update-application-client-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationClientByIdCommandHandler', () => {
  let commandHandler: OAuthUpdateApplicationClientByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthUpdateApplicationClientByIdCommandHandler,
        {
          provide: OAuthUpdateApplicationClientByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<OAuthUpdateApplicationClientByIdCommandHandler>(
      OAuthUpdateApplicationClientByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateApplicationClientByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an applicationClient created', async () => {
      expect(
        await commandHandler.execute(
          new OAuthUpdateApplicationClientByIdCommand(
            {
              applicationId: oAuthMockApplicationClientData[0].applicationId,
              clientId: oAuthMockApplicationClientData[0].clientId,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
