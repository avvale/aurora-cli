import { IamIUserRepository, IamMockUserRepository } from '@app/iam/user';
import { IamMaxUserService } from '@app/iam/user/application/max/iam-max-user.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxUserService', () =>
{
    let service: IamMaxUserService;
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
                IamMaxUserService,
                IamMockUserRepository,
                {
                    provide : IamIUserRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamMaxUserService);
        repository = module.get(IamIUserRepository);
        mockRepository = module.get(IamMockUserRepository);
    });

    describe('main', () =>
    {
        test('IamMaxUserService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(repository, 'max').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.max(column))));
            expect(await service.main('id')).toBe(mockRepository.max('id'));
        });
    });
});
