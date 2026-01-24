/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamDeletePermissionsCommand } from '@app/iam/permission';
import { IamDeletePermissionsCommandHandler } from '@app/iam/permission/application/delete/iam-delete-permissions.command-handler';
import { IamDeletePermissionsService } from '@app/iam/permission/application/delete/iam-delete-permissions.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionsCommandHandler', () => {
  let commandHandler: IamDeletePermissionsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamDeletePermissionsCommandHandler,
        {
          provide: IamDeletePermissionsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamDeletePermissionsCommandHandler>(
      IamDeletePermissionsCommandHandler,
    );
  });

  describe('main', () => {
    test('IamDeletePermissionsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return void', async () => {
      expect(
        await commandHandler.execute(new IamDeletePermissionsCommand()),
      ).toBe(undefined);
    });
  });
});
