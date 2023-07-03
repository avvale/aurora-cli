import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonGetAdministrativeAreasLevel3QueryHandler } from './common-get-administrative-areas-level-3.query-handler';
import { CommonMockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.repository';
import { CommonIAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/domain/common-administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3Mapper } from '@app/common/administrative-area-level-3/domain/common-administrative-area-level-3.mapper';
import { CommonGetAdministrativeAreasLevel3Query } from './common-get-administrative-areas-level-3.query';
import { CommonGetAdministrativeAreasLevel3Service } from './common-get-administrative-areas-level-3.service';

describe('GetAdministrativeAreasLevel3QueryHandler', () =>
{
    let queryHandler: CommonGetAdministrativeAreasLevel3QueryHandler;
    let service: CommonGetAdministrativeAreasLevel3Service;
    let repository: CommonMockAdministrativeAreaLevel3Repository;
    let mapper: CommonAdministrativeAreaLevel3Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonGetAdministrativeAreasLevel3QueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useClass: CommonMockAdministrativeAreaLevel3Repository,
                },
                {
                    provide : CommonGetAdministrativeAreasLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonGetAdministrativeAreasLevel3QueryHandler>(CommonGetAdministrativeAreasLevel3QueryHandler);
        service = module.get<CommonGetAdministrativeAreasLevel3Service>(CommonGetAdministrativeAreasLevel3Service);
        repository = <CommonMockAdministrativeAreaLevel3Repository>module.get<CommonIAdministrativeAreaLevel3Repository>(CommonIAdministrativeAreaLevel3Repository);
        mapper = new CommonAdministrativeAreaLevel3Mapper();
    });

    describe('main', () =>
    {
        test('CommonGetAdministrativeAreasLevel3QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel3 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonGetAdministrativeAreasLevel3Query(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});