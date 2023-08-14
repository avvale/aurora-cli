import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonRawSQLAdministrativeAreasLevel3Service } from './common-raw-sql-administrative-areas-level-3.service';
import { CommonIAdministrativeAreaLevel3Repository } from '../../domain/common-administrative-area-level-3.repository';
import { CommonMockAdministrativeAreaLevel3Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-3.repository';

describe('CommonRawSQLAdministrativeAreasLevel3Service ', () =>
{
    let service: CommonRawSQLAdministrativeAreasLevel3Service ;
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
                CommonRawSQLAdministrativeAreasLevel3Service ,
                CommonMockAdministrativeAreaLevel3Repository,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CommonRawSQLAdministrativeAreasLevel3Service );
        repository      = module.get(CommonIAdministrativeAreaLevel3Repository);
        mockRepository  = module.get(CommonMockAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('RawSQLAdministrativeAreasLevel3Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get administrativeAreasLevel3', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
