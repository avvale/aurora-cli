/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIAccountRepository, iamMockAccountData, IamMockAccountRepository } from '@app/iam/account';
import { IamUpdateAccountsService } from '@app/iam/account/application/update/iam-update-accounts.service';
import {
    IamAccountClientId,
    IamAccountCode,
    IamAccountDApplicationCodes,
    IamAccountDPermissions,
    IamAccountDTenants,
    IamAccountEmail,
    IamAccountId,
    IamAccountIsActive,
    IamAccountMeta,
    IamAccountRoleIds,
    IamAccountScopes,
    IamAccountTags,
    IamAccountTenantIds,
    IamAccountType,
} from '@app/iam/account/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAccountsService', () =>
{
    let service: IamUpdateAccountsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateAccountsService,
                IamMockAccountRepository,
                {
                    provide : IamIAccountRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdateAccountsService);
    });

    describe('main', () =>
    {
        test('UpdateAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a accounts and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new IamAccountId(iamMockAccountData[0].id),
                        type: new IamAccountType(iamMockAccountData[0].type),
                        code: new IamAccountCode(iamMockAccountData[0].code),
                        email: new IamAccountEmail(iamMockAccountData[0].email),
                        isActive: new IamAccountIsActive(iamMockAccountData[0].isActive),
                        clientId: new IamAccountClientId(iamMockAccountData[0].clientId),
                        tags: new IamAccountTags(iamMockAccountData[0].tags),
                        scopes: new IamAccountScopes(iamMockAccountData[0].scopes),
                        dApplicationCodes: new IamAccountDApplicationCodes(iamMockAccountData[0].dApplicationCodes),
                        dPermissions: new IamAccountDPermissions(iamMockAccountData[0].dPermissions),
                        dTenants: new IamAccountDTenants(iamMockAccountData[0].dTenants),
                        meta: new IamAccountMeta(iamMockAccountData[0].meta),
                        roleIds: new IamAccountRoleIds(iamMockAccountData[0].roleIds),
                        tenantIds: new IamAccountTenantIds(iamMockAccountData[0].tenantIds),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
