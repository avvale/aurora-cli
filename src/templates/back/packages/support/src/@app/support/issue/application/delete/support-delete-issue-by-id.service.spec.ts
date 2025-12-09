/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportIIssueRepository,
    supportMockIssueData,
    SupportMockIssueRepository,
} from '@app/support/issue';
import { SupportDeleteIssueByIdService } from '@app/support/issue/application/delete/support-delete-issue-by-id.service';
import { SupportIssueId } from '@app/support/issue/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteIssueByIdService', () => {
    let service: SupportDeleteIssueByIdService;
    let repository: SupportIIssueRepository;
    let mockRepository: SupportMockIssueRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                SupportDeleteIssueByIdService,
                SupportMockIssueRepository,
                {
                    provide: SupportIIssueRepository,
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

        service = module.get(SupportDeleteIssueByIdService);
        repository = module.get(SupportIIssueRepository);
        mockRepository = module.get(SupportMockIssueRepository);
    });

    describe('main', () => {
        test('SupportDeleteIssueByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete issue and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new SupportIssueId(supportMockIssueData[0].id),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
