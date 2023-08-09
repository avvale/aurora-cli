/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonCreateResourcesService } from './common-create-resources.service';
import { CommonIResourceRepository } from '../../domain/common-resource.repository';
import { CommonMockResourceRepository } from '../../infrastructure/mock/common-mock-resource.repository';

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
