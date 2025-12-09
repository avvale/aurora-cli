import {
    SupportICommentRepository,
    SupportMockCommentRepository,
} from '@app/support/comment';
import { SupportPaginateCommentsService } from '@app/support/comment/application/paginate/support-paginate-comments.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportPaginateCommentsService', () => {
    let service: SupportPaginateCommentsService;
    let repository: SupportICommentRepository;
    let mockRepository: SupportMockCommentRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                SupportPaginateCommentsService,
                SupportMockCommentRepository,
                {
                    provide: SupportICommentRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(SupportPaginateCommentsService);
        repository = module.get(SupportICommentRepository);
        mockRepository = module.get(SupportMockCommentRepository);
    });

    describe('main', () => {
        test('SupportPaginateCommentsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should paginate comments', async () => {
            jest.spyOn(repository, 'paginate').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: mockRepository.collectionSource.slice(0, 10)
                                .length,
                            count: mockRepository.collectionSource.slice(0, 10)
                                .length,
                            rows: mockRepository.collectionSource.slice(0, 10),
                        }),
                    ),
            );
            expect(
                await service.main({
                    offset: 0,
                    limit: 10,
                }),
            ).toStrictEqual({
                total: mockRepository.collectionSource.slice(0, 10).length,
                count: mockRepository.collectionSource.slice(0, 10).length,
                rows: mockRepository.collectionSource.slice(0, 10),
            });
        });
    });
});
