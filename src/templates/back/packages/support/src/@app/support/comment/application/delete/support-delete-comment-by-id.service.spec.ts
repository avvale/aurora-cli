/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportICommentRepository,
    supportMockCommentData,
    SupportMockCommentRepository,
} from '@app/support/comment';
import { SupportDeleteCommentByIdService } from '@app/support/comment/application/delete/support-delete-comment-by-id.service';
import { SupportCommentId } from '@app/support/comment/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteCommentByIdService', () => {
    let service: SupportDeleteCommentByIdService;
    let repository: SupportICommentRepository;
    let mockRepository: SupportMockCommentRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                SupportDeleteCommentByIdService,
                SupportMockCommentRepository,
                {
                    provide: SupportICommentRepository,
                    useValue: {
                        deleteById: (id) => {
                            /**/
                        },
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(SupportDeleteCommentByIdService);
        repository = module.get(SupportICommentRepository);
        mockRepository = module.get(SupportMockCommentRepository);
    });

    describe('main', () => {
        test('SupportDeleteCommentByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete comment and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new SupportCommentId(supportMockCommentData[0].id),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
