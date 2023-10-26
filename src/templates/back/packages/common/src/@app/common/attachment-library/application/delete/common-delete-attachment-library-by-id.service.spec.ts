/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentLibraryRepository, commonMockAttachmentLibraryData, CommonMockAttachmentLibraryRepository } from '@app/common/attachment-library';
import { CommonDeleteAttachmentLibraryByIdService } from '@app/common/attachment-library/application/delete/common-delete-attachment-library-by-id.service';
import { CommonAttachmentLibraryId } from '@app/common/attachment-library/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentLibraryByIdService', () =>
{
    let service: CommonDeleteAttachmentLibraryByIdService;
    let repository: CommonIAttachmentLibraryRepository;
    let mockRepository: CommonMockAttachmentLibraryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteAttachmentLibraryByIdService,
                CommonMockAttachmentLibraryRepository,
                {
                    provide : CommonIAttachmentLibraryRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteAttachmentLibraryByIdService);
        repository = module.get(CommonIAttachmentLibraryRepository);
        mockRepository = module.get(CommonMockAttachmentLibraryRepository);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentLibraryByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete attachmentLibrary and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new CommonAttachmentLibraryId(commonMockAttachmentLibraryData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
