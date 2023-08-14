import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonRawSQLAdministrativeAreasLevel2Service } from './common-raw-sql-administrative-areas-level-2.service';
import { CommonIAdministrativeAreaLevel2Repository } from '../../domain/common-administrative-area-level-2.repository';
import { CommonMockAdministrativeAreaLevel2Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-2.repository';

describe('CommonRawSQLAdministrativeAreasLevel2Service ', () =>
{
    let service: CommonRawSQLAdministrativeAreasLevel2Service ;
    let repository: CommonIAdministrativeAreaLevel2Repository;
    let mockRepository: CommonMockAdministrativeAreaLevel2Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonRawSQLAdministrativeAreasLevel2Service ,
                CommonMockAdministrativeAreaLevel2Repository,
                {
                    provide : CommonIAdministrativeAreaLevel2Repository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CommonRawSQLAdministrativeAreasLevel2Service );
        repository      = module.get(CommonIAdministrativeAreaLevel2Repository);
        mockRepository  = module.get(CommonMockAdministrativeAreaLevel2Repository);
    });

    describe('main', () =>
    {
        test('RawSQLAdministrativeAreasLevel2Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get administrativeAreasLevel2', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
