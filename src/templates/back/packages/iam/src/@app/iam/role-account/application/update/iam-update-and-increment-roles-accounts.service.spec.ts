/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIRoleAccountRepository, iamMockRoleAccountData, IamMockRoleAccountRepository } from '@app/iam/role-account';
import { IamUpdateAndIncrementRolesAccountsService } from '@app/iam/role-account/application/update/iam-update-and-increment-roles-accounts.service';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementRolesAccountsService', () =>
{
    let service: IamUpdateAndIncrementRolesAccountsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateAndIncrementRolesAccountsService,
                IamMockRoleAccountRepository,
                {
                    provide : IamIRoleAccountRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdateAndIncrementRolesAccountsService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementRolesAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a rolesAccounts and emit event', async () =>
        {
            /* eslint-disable key-spacing */
            expect(
                await service.main(
                    {
                        roleId: new IamRoleAccountRoleId(iamMockRoleAccountData[0].roleId),
                        accountId: new IamRoleAccountAccountId(iamMockRoleAccountData[0].accountId),
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
