/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentFamilyRepository, CommonMockAttachmentFamilyRepository } from '@app/common/attachment-family';
import { CommonDeleteAttachmentFamiliesService } from '@app/common/attachment-family/application/delete/common-delete-attachment-families.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentFamiliesService', () =>
{
    let service: CommonDeleteAttachmentFamiliesService;
    let repository: CommonIAttachmentFamilyRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteAttachmentFamiliesService,
                CommonMockAttachmentFamilyRepository,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteAttachmentFamiliesService);
        repository = module.get(CommonIAttachmentFamilyRepository);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentFamiliesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete attachmentFamily and emit event', async () =>
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
