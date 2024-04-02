/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITenantAccountRepository, iamMockTenantAccountData, IamMockTenantAccountRepository } from '@app/iam/tenant-account';
import { IamUpdateAndIncrementTenantsAccountsService } from '@app/iam/tenant-account/application/update/iam-update-and-increment-tenants-accounts.service';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementTenantsAccountsService', () =>
{
    let service: IamUpdateAndIncrementTenantsAccountsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateAndIncrementTenantsAccountsService,
                IamMockTenantAccountRepository,
                {
                    provide : IamITenantAccountRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdateAndIncrementTenantsAccountsService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementTenantsAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a tenantsAccounts and emit event', async () =>
        {
            /* eslint-disable key-spacing */
            expect(
                await service.main(
                    {
                        tenantId: new IamTenantAccountTenantId(iamMockTenantAccountData[0].tenantId),
                        accountId: new IamTenantAccountAccountId(iamMockTenantAccountData[0].accountId),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
