import { CommonIAdministrativeAreaLevel1Repository, CommonMockAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1';
import { CommonGetAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/get/common-get-administrative-areas-level-1.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAdministrativeAreasLevel1Service', () =>
{
    let service: CommonGetAdministrativeAreasLevel1Service;
    let repository: CommonIAdministrativeAreaLevel1Repository;
    let mockRepository: CommonMockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonGetAdministrativeAreasLevel1Service,
                CommonMockAdministrativeAreaLevel1Repository,
                {
                    provide : CommonIAdministrativeAreaLevel1Repository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonGetAdministrativeAreasLevel1Service);
        repository = module.get(CommonIAdministrativeAreaLevel1Repository);
        mockRepository = module.get(CommonMockAdministrativeAreaLevel1Repository);
    });

    describe('main', () =>
    {
        test('GetAdministrativeAreasLevel1Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get administrativeAreasLevel1', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
