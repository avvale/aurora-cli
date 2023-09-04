import { CommonAdministrativeAreaLevel3Mapper, CommonGetAdministrativeAreasLevel3Query, CommonIAdministrativeAreaLevel3Repository, CommonMockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3';
import { CommonGetAdministrativeAreasLevel3QueryHandler } from '@app/common/administrative-area-level-3/application/get/common-get-administrative-areas-level-3.query-handler';
import { CommonGetAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/get/common-get-administrative-areas-level-3.service';
import { Test, TestingModule } from '@nestjs/testing';

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
