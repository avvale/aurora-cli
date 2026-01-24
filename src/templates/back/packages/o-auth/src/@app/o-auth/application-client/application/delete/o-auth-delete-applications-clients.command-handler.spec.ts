import { OAuthDeleteApplicationsClientsCommand } from '@app/o-auth/application-client';
import { OAuthDeleteApplicationsClientsCommandHandler } from '@app/o-auth/application-client/application/delete/o-auth-delete-applications-clients.command-handler';
import { OAuthDeleteApplicationsClientsService } from '@app/o-auth/application-client/application/delete/o-auth-delete-applications-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationsClientsCommandHandler', () => {
  let commandHandler: OAuthDeleteApplicationsClientsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthDeleteApplicationsClientsCommandHandler,
        {
          provide: OAuthDeleteApplicationsClientsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<OAuthDeleteApplicationsClientsCommandHandler>(
      OAuthDeleteApplicationsClientsCommandHandler,
    );
  });

  describe('main', () => {
    test('OAuthDeleteApplicationsClientsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return void', async () => {
      expect(
        await commandHandler.execute(
          new OAuthDeleteApplicationsClientsCommand(),
        ),
      ).toBe(undefined);
    });
  });
});
