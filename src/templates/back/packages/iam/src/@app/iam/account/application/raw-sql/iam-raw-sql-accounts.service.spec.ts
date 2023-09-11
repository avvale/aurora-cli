import { IamIAccountRepository, IamMockAccountRepository } from '@app/iam/account';
import { IamRawSQLAccountsService } from '@app/iam/account/application/raw-sql/iam-raw-sql-accounts.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamRawSQLAccountsService ', () =>
{
    let service: IamRawSQLAccountsService ;
    let repository: IamIAccountRepository;
    let mockRepository: IamMockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamRawSQLAccountsService ,
                IamMockAccountRepository,
                {
                    provide : IamIAccountRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(IamRawSQLAccountsService );
        repository      = module.get(IamIAccountRepository);
        mockRepository  = module.get(IamMockAccountRepository);
    });

    describe('main', () =>
    {
        test('RawSQLAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get accounts', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
