/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIRoleAccountRepository,
    iamMockRoleAccountData,
    IamMockRoleAccountRepository,
} from '@app/iam/role-account';
import { IamCreateRoleAccountService } from '@app/iam/role-account/application/create/iam-create-role-account.service';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRoleAccountService', () => {
    let service: IamCreateRoleAccountService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateRoleAccountService,
                IamMockRoleAccountRepository,
                {
                    provide: IamIRoleAccountRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamCreateRoleAccountService);
    });

    describe('main', () => {
        test('IamCreateRoleAccountService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a roleAccount and emit event', async () => {
            expect(
                await service.main({
                    roleId: new IamRoleAccountRoleId(
                        iamMockRoleAccountData[0].roleId,
                    ),
                    accountId: new IamRoleAccountAccountId(
                        iamMockRoleAccountData[0].accountId,
                    ),
                }),
            ).toBe(undefined);
        });
    });
});
