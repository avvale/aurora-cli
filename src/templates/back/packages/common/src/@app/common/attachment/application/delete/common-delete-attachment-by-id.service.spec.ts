/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentRepository, commonMockAttachmentData, CommonMockAttachmentRepository } from '@app/common/attachment';
import { CommonDeleteAttachmentByIdService } from '@app/common/attachment/application/delete/common-delete-attachment-by-id.service';
import { CommonAttachmentId } from '@app/common/attachment/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentByIdService', () =>
{
    let service: CommonDeleteAttachmentByIdService;
    let repository: CommonIAttachmentRepository;
    let mockRepository: CommonMockAttachmentRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteAttachmentByIdService,
                CommonMockAttachmentRepository,
                {
                    provide : CommonIAttachmentRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteAttachmentByIdService);
        repository = module.get(CommonIAttachmentRepository);
        mockRepository = module.get(CommonMockAttachmentRepository);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete attachment and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new CommonAttachmentId(commonMockAttachmentData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
