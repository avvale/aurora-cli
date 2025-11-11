/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamITenantAccountRepository,
    iamMockTenantAccountData,
    IamMockTenantAccountRepository,
} from '@app/iam/tenant-account';
import { IamCreateTenantAccountService } from '@app/iam/tenant-account/application/create/iam-create-tenant-account.service';
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

describe('IamCreateTenantAccountService', () => {
    let service: IamCreateTenantAccountService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateTenantAccountService,
                IamMockTenantAccountRepository,
                {
                    provide: IamITenantAccountRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamCreateTenantAccountService);
    });

    describe('main', () => {
        test('IamCreateTenantAccountService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a tenantAccount and emit event', async () => {
            expect(
                await service.main({
                    tenantId: new IamTenantAccountTenantId(
                        iamMockTenantAccountData[0].tenantId,
                    ),
                    accountId: new IamTenantAccountAccountId(
                        iamMockTenantAccountData[0].accountId,
                    ),
                }),
            ).toBe(undefined);
        });
    });
});
