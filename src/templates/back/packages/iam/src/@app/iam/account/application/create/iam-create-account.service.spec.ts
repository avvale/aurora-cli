/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { iamMockAccountData } from '@app/iam/account/infrastructure/mock/iam-mock-account.data';
import { IamCreateAccountService } from './iam-create-account.service';
import {
    IamAccountId,
    IamAccountType,
    IamAccountCode,
    IamAccountEmail,
    IamAccountIsActive,
    IamAccountClientId,
    IamAccountScopes,
    IamAccountDApplicationCodes,
    IamAccountDPermissions,
    IamAccountDTenants,
    IamAccountMeta,
    IamAccountRoleIds,
    IamAccountTenantIds,
    IamAccountCreatedAt,
    IamAccountUpdatedAt,
    IamAccountDeletedAt,
} from '../../domain/value-objects';
import { IamIAccountRepository } from '../../domain/iam-account.repository';
import { IamMockAccountRepository } from '../../infrastructure/mock/iam-mock-account.repository';

describe('IamCreateAccountService', () =>

{
    let service: IamCreateAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateAccountService,
                IamMockAccountRepository,
                {
                    provide : IamIAccountRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCreateAccountService);
    });

    describe('main', () =>
    {
        test('IamCreateAccountService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a account and emit event', async () =>
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
                ),
            )
                .toBe(undefined);
        });
    });
});
