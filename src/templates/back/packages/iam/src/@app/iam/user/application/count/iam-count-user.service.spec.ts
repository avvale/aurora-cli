import { IamIUserRepository, IamMockUserRepository } from '@app/iam/user';
import { IamCountUserService } from '@app/iam/user/application/count/iam-count-user.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountUserService', () => {
    let service: IamCountUserService;
    let repository: IamIUserRepository;
    let mockRepository: IamMockUserRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCountUserService,
                IamMockUserRepository,
                {
                    provide: IamIUserRepository,
                    useValue: {
                        count: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamCountUserService);
        repository = module.get(IamIUserRepository);
        mockRepository = module.get(IamMockUserRepository);
    });

    describe('main', () => {
        test('IamCountUserService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () => {
            jest.spyOn(repository, 'count').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource.length),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource.length,
            );
        });
    });
});
