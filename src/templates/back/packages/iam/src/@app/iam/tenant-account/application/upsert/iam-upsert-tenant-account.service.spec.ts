/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITenantAccountRepository, iamMockTenantAccountData, IamMockTenantAccountRepository } from '@app/iam/tenant-account';
import { IamUpsertTenantAccountService } from '@app/iam/tenant-account/application/upsert/iam-upsert-tenant-account.service';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTenantAccountService', () =>

{
    let service: IamUpsertTenantAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpsertTenantAccountService,
                IamMockTenantAccountRepository,
                {
                    provide : IamITenantAccountRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpsertTenantAccountService);
    });

    describe('main', () =>
    {
        test('IamUpsertTenantAccountService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a tenantAccount and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        tenantId: new IamTenantAccountTenantId(iamMockTenantAccountData[0].tenantId),
                        accountId: new IamTenantAccountAccountId(iamMockTenantAccountData[0].accountId),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
