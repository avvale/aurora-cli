/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamITenantAccountRepository,
  iamMockTenantAccountData,
  IamMockTenantAccountRepository,
} from '@app/iam/tenant-account';
import { IamUpdateTenantAccountByIdService } from '@app/iam/tenant-account/application/update/iam-update-tenant-account-by-id.service';
import {
  IamTenantAccountAccountId,
  IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantAccountByIdService', () => {
  let service: IamUpdateTenantAccountByIdService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamUpdateTenantAccountByIdService,
        IamMockTenantAccountRepository,
        {
          provide: IamITenantAccountRepository,
          useValue: {
            updateById: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamUpdateTenantAccountByIdService);
  });

  describe('main', () => {
    test('IamUpdateTenantAccountByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a tenantAccount and emit event', async () => {
      expect(
        await service.main(
          {
            tenantId: new IamTenantAccountTenantId(
              iamMockTenantAccountData[0].tenantId,
            ),
            accountId: new IamTenantAccountAccountId(
              iamMockTenantAccountData[0].accountId,
            ),
          },
          {},
        ),
      ).toBe(undefined);
    });
  });
});
