import { IamDeleteAccountsCommand } from '@app/iam/account';
import { IamDeleteAccountsCommandHandler } from '@app/iam/account/application/delete/iam-delete-accounts.command-handler';
import { IamDeleteAccountsService } from '@app/iam/account/application/delete/iam-delete-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteAccountsCommandHandler', () => {
  let commandHandler: IamDeleteAccountsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamDeleteAccountsCommandHandler,
        {
          provide: IamDeleteAccountsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamDeleteAccountsCommandHandler>(
      IamDeleteAccountsCommandHandler,
    );
  });

  describe('main', () => {
    test('IamDeleteAccountsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return void', async () => {
      expect(await commandHandler.execute(new IamDeleteAccountsCommand())).toBe(
        undefined,
      );
    });
  });
});
