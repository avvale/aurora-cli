import { IamCreateUsersCommand, iamMockUserData } from '@app/iam/user';
import { IamCreateUsersCommandHandler } from '@app/iam/user/application/create/iam-create-users.command-handler';
import { IamCreateUsersService } from '@app/iam/user/application/create/iam-create-users.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('iamCreateUsersCommandHandler', () => {
  let commandHandler: IamCreateUsersCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCreateUsersCommandHandler,
        {
          provide: IamCreateUsersService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamCreateUsersCommandHandler>(
      IamCreateUsersCommandHandler,
    );
  });

  describe('main', () => {
    test('IamCreateUsersCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return IamMockUserData created', async () => {
      expect(
        await commandHandler.execute(
          new IamCreateUsersCommand(iamMockUserData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
