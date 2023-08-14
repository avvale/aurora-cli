import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamFindUserService } from './iam-find-user.service';
import { IamIUserRepository } from '../../domain/iam-user.repository';
import { IamMockUserRepository } from '../../infrastructure/mock/iam-mock-user.repository';

describe('IamFindUserService', () =>
{
    let service: IamFindUserService;
    let repository: IamIUserRepository;
    let mockRepository: IamMockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindUserService,
                IamMockUserRepository,
                {
                    provide : IamIUserRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamFindUserService);
        repository = module.get(IamIUserRepository);
        mockRepository = module.get(IamMockUserRepository);
    });

    describe('main', () =>
    {
        test('IamFindUserService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find user', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
