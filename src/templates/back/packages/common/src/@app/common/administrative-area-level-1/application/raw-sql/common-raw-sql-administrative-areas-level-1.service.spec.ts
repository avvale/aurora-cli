import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonRawSQLAdministrativeAreasLevel1Service } from './common-raw-sql-administrative-areas-level-1.service';
import { CommonIAdministrativeAreaLevel1Repository } from '../../domain/common-administrative-area-level-1.repository';
import { CommonMockAdministrativeAreaLevel1Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-1.repository';

describe('CommonRawSQLAdministrativeAreasLevel1Service ', () =>
{
    let service: CommonRawSQLAdministrativeAreasLevel1Service ;
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
                CommonRawSQLAdministrativeAreasLevel1Service ,
                CommonMockAdministrativeAreaLevel1Repository,
                {
                    provide : CommonIAdministrativeAreaLevel1Repository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CommonRawSQLAdministrativeAreasLevel1Service );
        repository      = module.get(CommonIAdministrativeAreaLevel1Repository);
        mockRepository  = module.get(CommonMockAdministrativeAreaLevel1Repository);
    });

    describe('main', () =>
    {
        test('RawSQLAdministrativeAreasLevel1Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get administrativeAreasLevel1', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
