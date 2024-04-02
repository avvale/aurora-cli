/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITagRepository, IamMockTagRepository } from '@app/iam/tag';
import { IamCreateTagsService } from '@app/iam/tag/application/create/iam-create-tags.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTagsService', () =>
{
    let service: IamCreateTagsService;
    let mockRepository: IamMockTagRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateTagsService,
                IamMockTagRepository,
                {
                    provide : IamITagRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCreateTagsService);
        mockRepository = module.get(IamMockTagRepository);
    });

    describe('main', () =>
    {
        test('CreateTagsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create tags and emit event', async () =>
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
