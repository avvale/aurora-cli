import { IamITenantAccountRepository, IamMockTenantAccountRepository } from '@app/iam/tenant-account';
import { IamRawSQLTenantsAccountsService } from '@app/iam/tenant-account/application/raw-sql/iam-raw-sql-tenants-accounts.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamRawSQLTenantsAccountsService ', () =>
{
    let service: IamRawSQLTenantsAccountsService ;
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
                IamRawSQLTenantsAccountsService ,
                IamMockTenantAccountRepository,
                {
                    provide : IamITenantAccountRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(IamRawSQLTenantsAccountsService );
        repository      = module.get(IamITenantAccountRepository);
        mockRepository  = module.get(IamMockTenantAccountRepository);
    });

    describe('main', () =>
    {
        test('RawSQLTenantsAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get tenantsAccounts', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
