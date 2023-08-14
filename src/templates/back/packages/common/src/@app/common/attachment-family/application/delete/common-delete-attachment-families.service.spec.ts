/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonDeleteAttachmentFamiliesService } from './common-delete-attachment-families.service';
import { CommonIAttachmentFamilyRepository } from '../../domain/common-attachment-family.repository';
import { CommonMockAttachmentFamilyRepository } from '../../infrastructure/mock/common-mock-attachment-family.repository';

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
