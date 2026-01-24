import {
  oAuthMockClientData,
  OAuthUpdateClientByIdCommand,
} from '@app/o-auth/client';
import { OAuthUpdateClientByIdCommandHandler } from '@app/o-auth/client/application/update/o-auth-update-client-by-id.command-handler';
import { OAuthUpdateClientByIdService } from '@app/o-auth/client/application/update/o-auth-update-client-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateClientByIdCommandHandler', () => {
  let commandHandler: OAuthUpdateClientByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthUpdateClientByIdCommandHandler,
        {
          provide: OAuthUpdateClientByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<OAuthUpdateClientByIdCommandHandler>(
      OAuthUpdateClientByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateClientByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an client created', async () => {
      expect(
        await commandHandler.execute(
          new OAuthUpdateClientByIdCommand(
            {
              id: oAuthMockClientData[0].id,
              rowId: oAuthMockClientData[0].rowId,
              grantType: oAuthMockClientData[0].grantType,
              name: oAuthMockClientData[0].name,
              secret: oAuthMockClientData[0].secret,
              authUrl: oAuthMockClientData[0].authUrl,
              redirect: oAuthMockClientData[0].redirect,
              scopeOptions: oAuthMockClientData[0].scopeOptions,
              expiredAccessToken: oAuthMockClientData[0].expiredAccessToken,
              expiredRefreshToken: oAuthMockClientData[0].expiredRefreshToken,
              isActive: oAuthMockClientData[0].isActive,
              isMaster: oAuthMockClientData[0].isMaster,
              applicationIds: oAuthMockClientData[0].applicationIds,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
