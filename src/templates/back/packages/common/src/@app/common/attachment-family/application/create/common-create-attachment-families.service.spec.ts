/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonCreateAttachmentFamiliesService } from './common-create-attachment-families.service';
import { CommonIAttachmentFamilyRepository } from '../../domain/common-attachment-family.repository';
import { CommonMockAttachmentFamilyRepository } from '../../infrastructure/mock/common-mock-attachment-family.repository';

describe('CommonCreateAttachmentFamiliesService', () =>
{
    let service: CommonCreateAttachmentFamiliesService;
    let mockRepository: CommonMockAttachmentFamilyRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonCreateAttachmentFamiliesService,
                CommonMockAttachmentFamilyRepository,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonCreateAttachmentFamiliesService);
        mockRepository = module.get(CommonMockAttachmentFamilyRepository);
    });

    describe('main', () =>
    {
        test('CreateAttachmentFamiliesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create attachmentFamilies and emit event', async () =>
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
