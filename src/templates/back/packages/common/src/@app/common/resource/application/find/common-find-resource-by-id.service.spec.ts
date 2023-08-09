import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockResourceData } from '@app/common/resource/infrastructure/mock/common-mock-resource.data';
import { CommonFindResourceByIdService } from './common-find-resource-by-id.service';
import { CommonResourceId } from '../../domain/value-objects';
import { CommonIResourceRepository } from '../../domain/common-resource.repository';
import { CommonMockResourceRepository } from '../../infrastructure/mock/common-mock-resource.repository';

describe('CommonFindResourceByIdService', () =>
{
    let service: CommonFindResourceByIdService;
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
                CommonFindResourceByIdService,
                CommonMockResourceRepository,
                {
                    provide : CommonIResourceRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonFindResourceByIdService);
        repository = module.get(CommonIResourceRepository);
        mockRepository = module.get(CommonMockResourceRepository);
    });

    describe('main', () =>
    {
        test('FindResourceByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find resource by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new CommonResourceId(commonMockResourceData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
