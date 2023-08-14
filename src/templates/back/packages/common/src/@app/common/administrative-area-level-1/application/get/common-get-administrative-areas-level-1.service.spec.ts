import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonGetAdministrativeAreasLevel1Service } from './common-get-administrative-areas-level-1.service';
import { CommonIAdministrativeAreaLevel1Repository } from '../../domain/common-administrative-area-level-1.repository';
import { CommonMockAdministrativeAreaLevel1Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-1.repository';

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
