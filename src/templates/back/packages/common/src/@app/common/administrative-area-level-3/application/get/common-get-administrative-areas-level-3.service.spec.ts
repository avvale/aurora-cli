import { CommonIAdministrativeAreaLevel3Repository, CommonMockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3';
import { CommonGetAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/get/common-get-administrative-areas-level-3.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAdministrativeAreasLevel3Service', () =>
{
    let service: CommonGetAdministrativeAreasLevel3Service;
    let repository: CommonIAdministrativeAreaLevel3Repository;
    let mockRepository: CommonMockAdministrativeAreaLevel3Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonGetAdministrativeAreasLevel3Service,
                CommonMockAdministrativeAreaLevel3Repository,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonGetAdministrativeAreasLevel3Service);
        repository = module.get(CommonIAdministrativeAreaLevel3Repository);
        mockRepository = module.get(CommonMockAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('GetAdministrativeAreasLevel3Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get administrativeAreasLevel3', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
