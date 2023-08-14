import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamPaginateAccountsService } from './iam-paginate-accounts.service';
import { IamIAccountRepository } from '../../domain/iam-account.repository';
import { IamMockAccountRepository } from '../../infrastructure/mock/iam-mock-account.repository';

describe('IamPaginateAccountsService', () =>
{
    let service: IamPaginateAccountsService;
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
                IamPaginateAccountsService,
                IamMockAccountRepository,
                {
                    provide : IamIAccountRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamPaginateAccountsService);
        repository = module.get(IamIAccountRepository);
        mockRepository = module.get(IamMockAccountRepository);
    });

    describe('main', () =>
    {
        test('IamPaginateAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate accounts', async () =>
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
