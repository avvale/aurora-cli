/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIResourceRepository, CommonMockResourceRepository } from '@app/common/resource';
import { CommonCreateResourcesService } from '@app/common/resource/application/create/common-create-resources.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateResourcesService', () =>
{
    let service: CommonCreateResourcesService;
    let mockRepository: CommonMockResourceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonCreateResourcesService,
                CommonMockResourceRepository,
                {
                    provide : CommonIResourceRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonCreateResourcesService);
        mockRepository = module.get(CommonMockResourceRepository);
    });

    describe('main', () =>
    {
        test('CreateResourcesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create resources and emit event', async () =>
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
