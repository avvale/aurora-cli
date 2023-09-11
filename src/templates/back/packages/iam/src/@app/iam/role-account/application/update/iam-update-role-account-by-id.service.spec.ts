/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIRoleAccountRepository, iamMockRoleAccountData, IamMockRoleAccountRepository } from '@app/iam/role-account';
import { IamUpdateRoleAccountByIdService } from '@app/iam/role-account/application/update/iam-update-role-account-by-id.service';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRoleAccountByIdService', () =>
{
    let service: IamUpdateRoleAccountByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateRoleAccountByIdService,
                IamMockRoleAccountRepository,
                {
                    provide : IamIRoleAccountRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdateRoleAccountByIdService);
    });

    describe('main', () =>
    {
        test('IamUpdateRoleAccountByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a roleAccount and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        roleId: new IamRoleAccountRoleId(iamMockRoleAccountData[0].roleId),
                        accountId: new IamRoleAccountAccountId(iamMockRoleAccountData[0].accountId),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
