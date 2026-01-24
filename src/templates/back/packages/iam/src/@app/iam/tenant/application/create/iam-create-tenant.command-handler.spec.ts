import { IamCreateTenantCommand, iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';
import { IamCreateTenantCommandHandler } from './iam-create-tenant.command-handler';
import { IamCreateTenantService } from './iam-create-tenant.service';

describe('IamCreateTenantCommandHandler', () => {
  let commandHandler: IamCreateTenantCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCreateTenantCommandHandler,
        {
          provide: IamCreateTenantService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamCreateTenantCommandHandler>(
      IamCreateTenantCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateTenantCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the IamCreateTenantService', async () => {
      expect(
        await commandHandler.execute(
          new IamCreateTenantCommand(
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
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
