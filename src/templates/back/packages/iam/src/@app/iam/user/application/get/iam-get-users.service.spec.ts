import { IamIUserRepository, IamMockUserRepository } from '@app/iam/user';
import { IamGetUsersService } from '@app/iam/user/application/get/iam-get-users.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetUsersService', () =>
{
    let service: IamGetUsersService;
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
                IamGetUsersService,
                IamMockUserRepository,
                {
                    provide : IamIUserRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamGetUsersService);
        repository = module.get(IamIUserRepository);
        mockRepository = module.get(IamMockUserRepository);
    });

    describe('main', () =>
    {
        test('GetUsersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get users', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
