import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { iamMockAccountData } from '@app/iam/account/infrastructure/mock/iam-mock-account.data';
import { IamFindAccountByIdService } from './iam-find-account-by-id.service';
import { IamAccountId } from '../../domain/value-objects';
import { IamIAccountRepository } from '../../domain/iam-account.repository';
import { IamMockAccountRepository } from '../../infrastructure/mock/iam-mock-account.repository';

describe('IamFindAccountByIdService', () =>
{
    let service: IamFindAccountByIdService;
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
                IamFindAccountByIdService,
                IamMockAccountRepository,
                {
                    provide : IamIAccountRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamFindAccountByIdService);
        repository = module.get(IamIAccountRepository);
        mockRepository = module.get(IamMockAccountRepository);
    });

    describe('main', () =>
    {
        test('FindAccountByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find account by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new IamAccountId(iamMockAccountData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
