import {
    IamIBoundedContextRepository,
    IamMockBoundedContextRepository,
} from '@app/iam/bounded-context';
import { IamFindBoundedContextService } from '@app/iam/bounded-context/application/find/iam-find-bounded-context.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindBoundedContextService', () => {
    let service: IamFindBoundedContextService;
    let repository: IamIBoundedContextRepository;
    let mockRepository: IamMockBoundedContextRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindBoundedContextService,
                IamMockBoundedContextRepository,
                {
                    provide: IamIBoundedContextRepository,
                    useValue: {
                        find: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamFindBoundedContextService);
        repository = module.get(IamIBoundedContextRepository);
        mockRepository = module.get(IamMockBoundedContextRepository);
    });

    describe('main', () => {
        test('IamFindBoundedContextService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find boundedContext', async () => {
            jest.spyOn(repository, 'find').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource[0],
            );
        });
    });
});
