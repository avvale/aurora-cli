import { IamITenantAccountRepository, iamMockTenantAccountData, IamMockTenantAccountRepository } from '@app/iam/tenant-account';
import { IamFindTenantAccountByIdService } from '@app/iam/tenant-account/application/find/iam-find-tenant-account-by-id.service';
import { IamTenantAccountId } from '@app/iam/tenant-account/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantAccountByIdService', () =>
{
    let service: IamFindTenantAccountByIdService;
    let repository: IamITenantAccountRepository;
    let mockRepository: IamMockTenantAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindTenantAccountByIdService,
                IamMockTenantAccountRepository,
                {
                    provide : IamITenantAccountRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamFindTenantAccountByIdService);
        repository = module.get(IamITenantAccountRepository);
        mockRepository = module.get(IamMockTenantAccountRepository);
    });

    describe('main', () =>
    {
        test('FindTenantAccountByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find tenantAccount by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new IamTenantAccountId(iamMockTenantAccountData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
