import { IamITenantAccountRepository, IamMockTenantAccountRepository } from '@app/iam/tenant-account';
import { IamPaginateTenantsAccountsService } from '@app/iam/tenant-account/application/paginate/iam-paginate-tenants-accounts.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTenantsAccountsService', () =>
{
    let service: IamPaginateTenantsAccountsService;
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
                IamPaginateTenantsAccountsService,
                IamMockTenantAccountRepository,
                {
                    provide : IamITenantAccountRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamPaginateTenantsAccountsService);
        repository = module.get(IamITenantAccountRepository);
        mockRepository = module.get(IamMockTenantAccountRepository);
    });

    describe('main', () =>
    {
        test('IamPaginateTenantsAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate tenantsAccounts', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});
