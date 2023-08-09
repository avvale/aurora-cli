import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';
import { CommonFindAdministrativeAreaLevel3ByIdService } from './common-find-administrative-area-level-3-by-id.service';
import { CommonAdministrativeAreaLevel3Id } from '../../domain/value-objects';
import { CommonIAdministrativeAreaLevel3Repository } from '../../domain/common-administrative-area-level-3.repository';
import { CommonMockAdministrativeAreaLevel3Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-3.repository';

describe('CommonFindAdministrativeAreaLevel3ByIdService', () =>
{
    let service: CommonFindAdministrativeAreaLevel3ByIdService;
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
                CommonFindAdministrativeAreaLevel3ByIdService,
                CommonMockAdministrativeAreaLevel3Repository,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonFindAdministrativeAreaLevel3ByIdService);
        repository = module.get(CommonIAdministrativeAreaLevel3Repository);
        mockRepository = module.get(CommonMockAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel3ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find administrativeAreaLevel3 by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new CommonAdministrativeAreaLevel3Id(commonMockAdministrativeAreaLevel3Data[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
