import { IamIRoleAccountRepository, IamMockRoleAccountRepository } from '@app/iam/role-account';
import { IamRawSQLRolesAccountsService } from '@app/iam/role-account/application/raw-sql/iam-raw-sql-roles-accounts.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamRawSQLRolesAccountsService ', () =>
{
    let service: IamRawSQLRolesAccountsService ;
    let repository: IamIRoleAccountRepository;
    let mockRepository: IamMockRoleAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamRawSQLRolesAccountsService ,
                IamMockRoleAccountRepository,
                {
                    provide : IamIRoleAccountRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(IamRawSQLRolesAccountsService );
        repository      = module.get(IamIRoleAccountRepository);
        mockRepository  = module.get(IamMockRoleAccountRepository);
    });

    describe('main', () =>
    {
        test('RawSQLRolesAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get rolesAccounts', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
