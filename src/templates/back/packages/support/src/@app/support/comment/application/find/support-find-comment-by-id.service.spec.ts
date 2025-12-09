import {
    SupportICommentRepository,
    supportMockCommentData,
    SupportMockCommentRepository,
} from '@app/support/comment';
import { SupportFindCommentByIdService } from '@app/support/comment/application/find/support-find-comment-by-id.service';
import { SupportCommentId } from '@app/support/comment/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindCommentByIdService', () => {
    let service: SupportFindCommentByIdService;
    let repository: SupportICommentRepository;
    let mockRepository: SupportMockCommentRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                SupportFindCommentByIdService,
                SupportMockCommentRepository,
                {
                    provide: SupportICommentRepository,
                    useValue: {
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(SupportFindCommentByIdService);
        repository = module.get(SupportICommentRepository);
        mockRepository = module.get(SupportMockCommentRepository);
    });

    describe('main', () => {
        test('FindCommentByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find comment by id', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new SupportCommentId(supportMockCommentData[0].id),
                ),
            ).toBe(mockRepository.collectionSource[0]);
        });
    });
});
