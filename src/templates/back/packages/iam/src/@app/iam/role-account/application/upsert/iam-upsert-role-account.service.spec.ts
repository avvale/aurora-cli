/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIRoleAccountRepository, iamMockRoleAccountData, IamMockRoleAccountRepository } from '@app/iam/role-account';
import { IamUpsertRoleAccountService } from '@app/iam/role-account/application/upsert/iam-upsert-role-account.service';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertRoleAccountService', () =>

{
    let service: IamUpsertRoleAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpsertRoleAccountService,
                IamMockRoleAccountRepository,
                {
                    provide : IamIRoleAccountRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpsertRoleAccountService);
    });

    describe('main', () =>
    {
        test('IamUpsertRoleAccountService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a roleAccount and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        roleId: new IamRoleAccountRoleId(iamMockRoleAccountData[0].roleId),
                        accountId: new IamRoleAccountAccountId(iamMockRoleAccountData[0].accountId),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
