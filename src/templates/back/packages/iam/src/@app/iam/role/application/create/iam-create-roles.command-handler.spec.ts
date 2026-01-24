import { IamCreateRolesCommand, iamMockRoleData } from '@app/iam/role';
import { IamCreateRolesCommandHandler } from '@app/iam/role/application/create/iam-create-roles.command-handler';
import { IamCreateRolesService } from '@app/iam/role/application/create/iam-create-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('iamCreateRolesCommandHandler', () => {
  let commandHandler: IamCreateRolesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCreateRolesCommandHandler,
        {
          provide: IamCreateRolesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamCreateRolesCommandHandler>(
      IamCreateRolesCommandHandler,
    );
  });

  describe('main', () => {
    test('IamCreateRolesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return IamMockRoleData created', async () => {
      expect(
        await commandHandler.execute(
          new IamCreateRolesCommand(iamMockRoleData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
