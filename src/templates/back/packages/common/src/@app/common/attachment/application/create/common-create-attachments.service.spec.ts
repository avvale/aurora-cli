/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentRepository, CommonMockAttachmentRepository } from '@app/common/attachment';
import { CommonCreateAttachmentsService } from '@app/common/attachment/application/create/common-create-attachments.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentsService', () =>
{
    let service: CommonCreateAttachmentsService;
    let mockRepository: CommonMockAttachmentRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonCreateAttachmentsService,
                CommonMockAttachmentRepository,
                {
                    provide : CommonIAttachmentRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonCreateAttachmentsService);
        mockRepository = module.get(CommonMockAttachmentRepository);
    });

    describe('main', () =>
    {
        test('CreateAttachmentsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create attachments and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
