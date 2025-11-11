/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamITenantAccountRepository,
    IamMockTenantAccountRepository,
} from '@app/iam/tenant-account';
import { IamCreateTenantsAccountsService } from '@app/iam/tenant-account/application/create/iam-create-tenants-accounts.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantsAccountsService', () => {
    let service: IamCreateTenantsAccountsService;
    let mockRepository: IamMockTenantAccountRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateTenantsAccountsService,
                IamMockTenantAccountRepository,
                {
                    provide: IamITenantAccountRepository,
                    useValue: {
                        insert: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamCreateTenantsAccountsService);
        mockRepository = module.get(IamMockTenantAccountRepository);
    });

    describe('main', () => {
        test('CreateTenantsAccountsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create tenantsAccounts and emit event', async () => {
            expect(await service.main(mockRepository.collectionSource)).toBe(
                undefined,
            );
        });
    });
});
