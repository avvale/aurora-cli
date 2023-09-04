/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIResourceRepository, commonMockResourceData, CommonMockResourceRepository } from '@app/common/resource';
import { CommonDeleteResourceByIdService } from '@app/common/resource/application/delete/common-delete-resource-by-id.service';
import { CommonResourceId } from '@app/common/resource/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteResourceByIdService', () =>
{
    let service: CommonDeleteResourceByIdService;
    let repository: CommonIResourceRepository;
    let mockRepository: CommonMockResourceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteResourceByIdService,
                CommonMockResourceRepository,
                {
                    provide : CommonIResourceRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteResourceByIdService);
        repository = module.get(CommonIResourceRepository);
        mockRepository = module.get(CommonMockResourceRepository);
    });

    describe('main', () =>
    {
        test('CommonDeleteResourceByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete resource and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new CommonResourceId(commonMockResourceData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
