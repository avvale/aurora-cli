import {
    IamITenantAccountRepository,
    IamMockTenantAccountRepository,
} from '@app/iam/tenant-account';
import { IamFindTenantAccountService } from '@app/iam/tenant-account/application/find/iam-find-tenant-account.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantAccountService', () => {
    let service: IamFindTenantAccountService;
    let repository: IamITenantAccountRepository;
    let mockRepository: IamMockTenantAccountRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindTenantAccountService,
                IamMockTenantAccountRepository,
                {
                    provide: IamITenantAccountRepository,
                    useValue: {
                        find: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamFindTenantAccountService);
        repository = module.get(IamITenantAccountRepository);
        mockRepository = module.get(IamMockTenantAccountRepository);
    });

    describe('main', () => {
        test('IamFindTenantAccountService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find tenantAccount', async () => {
            jest.spyOn(repository, 'find').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource[0],
            );
        });
    });
});
