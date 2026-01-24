import { IamDeleteTenantsCommand } from '@app/iam/tenant';
import { IamDeleteTenantsCommandHandler } from '@app/iam/tenant/application/delete/iam-delete-tenants.command-handler';
import { IamDeleteTenantsService } from '@app/iam/tenant/application/delete/iam-delete-tenants.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantsCommandHandler', () => {
  let commandHandler: IamDeleteTenantsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamDeleteTenantsCommandHandler,
        {
          provide: IamDeleteTenantsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamDeleteTenantsCommandHandler>(
      IamDeleteTenantsCommandHandler,
    );
  });

  describe('main', () => {
    test('IamDeleteTenantsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return void', async () => {
      expect(await commandHandler.execute(new IamDeleteTenantsCommand())).toBe(
        undefined,
      );
    });
  });
});
