/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIAccountRepository, iamMockAccountData, IamMockAccountRepository } from '@app/iam/account';
import { IamUpdateAccountByIdService } from '@app/iam/account/application/update/iam-update-account-by-id.service';
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
    IamAccountTenantIds,
    IamAccountType,
} from '@app/iam/account/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAccountByIdService', () =>
{
    let service: IamUpdateAccountByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateAccountByIdService,
                IamMockAccountRepository,
                {
                    provide : IamIAccountRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdateAccountByIdService);
    });

    describe('main', () =>
    {
        test('IamUpdateAccountByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a account and emit event', async () =>
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
                        scopes: new IamAccountScopes(iamMockAccountData[0].scopes),
                        dApplicationCodes: new IamAccountDApplicationCodes(iamMockAccountData[0].dApplicationCodes),
                        dPermissions: new IamAccountDPermissions(iamMockAccountData[0].dPermissions),
                        dTenants: new IamAccountDTenants(iamMockAccountData[0].dTenants),
                        meta: new IamAccountMeta(iamMockAccountData[0].meta),
                        roleIds: new IamAccountRoleIds(iamMockAccountData[0].roleIds),
                        tenantIds: new IamAccountTenantIds(iamMockAccountData[0].tenantIds),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
