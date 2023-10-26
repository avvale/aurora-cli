/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentRepository, CommonMockAttachmentRepository } from '@app/common/attachment';
import { CommonDeleteAttachmentsService } from '@app/common/attachment/application/delete/common-delete-attachments.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentsService', () =>
{
    let service: CommonDeleteAttachmentsService;
    let repository: CommonIAttachmentRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteAttachmentsService,
                CommonMockAttachmentRepository,
                {
                    provide : CommonIAttachmentRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteAttachmentsService);
        repository = module.get(CommonIAttachmentRepository);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete attachment and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
