import { iamMockTenantData, IamUpdateTenantByIdCommand } from '@app/iam/tenant';
import { IamUpdateTenantByIdCommandHandler } from '@app/iam/tenant/application/update/iam-update-tenant-by-id.command-handler';
import { IamUpdateTenantByIdService } from '@app/iam/tenant/application/update/iam-update-tenant-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantByIdCommandHandler', () => {
  let commandHandler: IamUpdateTenantByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamUpdateTenantByIdCommandHandler,
        {
          provide: IamUpdateTenantByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamUpdateTenantByIdCommandHandler>(
      IamUpdateTenantByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateTenantByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an tenant created', async () => {
      expect(
        await commandHandler.execute(
          new IamUpdateTenantByIdCommand(
            {
              id: iamMockTenantData[0].id,
              rowId: iamMockTenantData[0].rowId,
              parentId: iamMockTenantData[0].parentId,
              name: iamMockTenantData[0].name,
              code: iamMockTenantData[0].code,
              logo: iamMockTenantData[0].logo,
              isActive: iamMockTenantData[0].isActive,
              meta: iamMockTenantData[0].meta,
              accountIds: iamMockTenantData[0].accountIds,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
