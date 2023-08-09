import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonFindAdministrativeAreaLevel3Service } from './common-find-administrative-area-level-3.service';
import { CommonIAdministrativeAreaLevel3Repository } from '../../domain/common-administrative-area-level-3.repository';
import { CommonMockAdministrativeAreaLevel3Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-3.repository';

describe('CommonFindAdministrativeAreaLevel3Service', () =>
{
    let service: CommonFindAdministrativeAreaLevel3Service;
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
                CommonFindAdministrativeAreaLevel3Service,
                CommonMockAdministrativeAreaLevel3Repository,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonFindAdministrativeAreaLevel3Service);
        repository = module.get(CommonIAdministrativeAreaLevel3Repository);
        mockRepository = module.get(CommonMockAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel3Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find administrativeAreaLevel3', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
