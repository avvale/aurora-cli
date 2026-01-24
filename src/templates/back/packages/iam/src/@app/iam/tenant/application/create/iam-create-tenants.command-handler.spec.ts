import { IamCreateTenantsCommand, iamMockTenantData } from '@app/iam/tenant';
import { IamCreateTenantsCommandHandler } from '@app/iam/tenant/application/create/iam-create-tenants.command-handler';
import { IamCreateTenantsService } from '@app/iam/tenant/application/create/iam-create-tenants.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('iamCreateTenantsCommandHandler', () => {
  let commandHandler: IamCreateTenantsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCreateTenantsCommandHandler,
        {
          provide: IamCreateTenantsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamCreateTenantsCommandHandler>(
      IamCreateTenantsCommandHandler,
    );
  });

  describe('main', () => {
    test('IamCreateTenantsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return IamMockTenantData created', async () => {
      expect(
        await commandHandler.execute(
          new IamCreateTenantsCommand(iamMockTenantData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
