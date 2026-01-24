import {
  OAuthCreateApplicationClientCommand,
  oAuthMockApplicationClientData,
} from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';
import { OAuthCreateApplicationClientCommandHandler } from './o-auth-create-application-client.command-handler';
import { OAuthCreateApplicationClientService } from './o-auth-create-application-client.service';

describe('OAuthCreateApplicationClientCommandHandler', () => {
  let commandHandler: OAuthCreateApplicationClientCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthCreateApplicationClientCommandHandler,
        {
          provide: OAuthCreateApplicationClientService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<OAuthCreateApplicationClientCommandHandler>(
      OAuthCreateApplicationClientCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateApplicationClientCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the OAuthCreateApplicationClientService', async () => {
      expect(
        await commandHandler.execute(
          new OAuthCreateApplicationClientCommand(
            {
              applicationId: oAuthMockApplicationClientData[0].applicationId,
              clientId: oAuthMockApplicationClientData[0].clientId,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
