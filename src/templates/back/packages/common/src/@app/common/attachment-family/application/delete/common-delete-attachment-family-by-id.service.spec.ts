/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.data';
import { CommonDeleteAttachmentFamilyByIdService } from './common-delete-attachment-family-by-id.service';
import { CommonAttachmentFamilyId } from '../../domain/value-objects';
import { CommonIAttachmentFamilyRepository } from '../../domain/common-attachment-family.repository';
import { CommonMockAttachmentFamilyRepository } from '../../infrastructure/mock/common-mock-attachment-family.repository';

describe('CommonDeleteAttachmentFamilyByIdService', () =>
{
    let service: CommonDeleteAttachmentFamilyByIdService;
    let repository: CommonIAttachmentFamilyRepository;
    let mockRepository: CommonMockAttachmentFamilyRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteAttachmentFamilyByIdService,
                CommonMockAttachmentFamilyRepository,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteAttachmentFamilyByIdService);
        repository = module.get(CommonIAttachmentFamilyRepository);
        mockRepository = module.get(CommonMockAttachmentFamilyRepository);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentFamilyByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete attachmentFamily and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new CommonAttachmentFamilyId(commonMockAttachmentFamilyData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
