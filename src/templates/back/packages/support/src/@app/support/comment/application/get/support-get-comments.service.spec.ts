import {
    SupportICommentRepository,
    SupportMockCommentRepository,
} from '@app/support/comment';
import { SupportGetCommentsService } from '@app/support/comment/application/get/support-get-comments.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportGetCommentsService', () => {
    let service: SupportGetCommentsService;
    let repository: SupportICommentRepository;
    let mockRepository: SupportMockCommentRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                SupportGetCommentsService,
                SupportMockCommentRepository,
                {
                    provide: SupportICommentRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(SupportGetCommentsService);
        repository = module.get(SupportICommentRepository);
        mockRepository = module.get(SupportMockCommentRepository);
    });

    describe('main', () => {
        test('GetCommentsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should get comments', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource),
                    ),
            );
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
