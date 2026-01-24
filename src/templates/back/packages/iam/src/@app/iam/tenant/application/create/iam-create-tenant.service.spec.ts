/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamITenantRepository,
  iamMockTenantData,
  IamMockTenantRepository,
} from '@app/iam/tenant';
import { IamCreateTenantService } from '@app/iam/tenant/application/create/iam-create-tenant.service';
import {
  IamTenantAccountIds,
  IamTenantCode,
  IamTenantId,
  IamTenantIsActive,
  IamTenantLogo,
  IamTenantMeta,
  IamTenantName,
  IamTenantParentId,
  IamTenantRowId,
} from '@app/iam/tenant/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantService', () => {
  let service: IamCreateTenantService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamCreateTenantService,
        IamMockTenantRepository,
        {
          provide: IamITenantRepository,
          useValue: {
            create: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamCreateTenantService);
  });

  describe('main', () => {
    test('IamCreateTenantService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create a tenant and emit event', async () => {
      expect(
        await service.main({
          id: new IamTenantId(iamMockTenantData[0].id),
          rowId: new IamTenantRowId(iamMockTenantData[0].rowId),
          parentId: new IamTenantParentId(iamMockTenantData[0].parentId),
          name: new IamTenantName(iamMockTenantData[0].name),
          code: new IamTenantCode(iamMockTenantData[0].code),
          logo: new IamTenantLogo(iamMockTenantData[0].logo),
          isActive: new IamTenantIsActive(iamMockTenantData[0].isActive),
          meta: new IamTenantMeta(iamMockTenantData[0].meta),
          accountIds: new IamTenantAccountIds(iamMockTenantData[0].accountIds),
        }),
      ).toBe(undefined);
    });
  });
});
