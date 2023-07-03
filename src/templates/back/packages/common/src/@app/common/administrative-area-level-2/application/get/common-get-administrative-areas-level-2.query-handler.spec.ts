import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonGetAdministrativeAreasLevel2QueryHandler } from './common-get-administrative-areas-level-2.query-handler';
import { CommonMockAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.repository';
import { CommonIAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/domain/common-administrative-area-level-2.repository';
import { CommonAdministrativeAreaLevel2Mapper } from '@app/common/administrative-area-level-2/domain/common-administrative-area-level-2.mapper';
import { CommonGetAdministrativeAreasLevel2Query } from './common-get-administrative-areas-level-2.query';
import { CommonGetAdministrativeAreasLevel2Service } from './common-get-administrative-areas-level-2.service';

describe('GetAdministrativeAreasLevel2QueryHandler', () =>
{
    let queryHandler: CommonGetAdministrativeAreasLevel2QueryHandler;
    let service: CommonGetAdministrativeAreasLevel2Service;
    let repository: CommonMockAdministrativeAreaLevel2Repository;
    let mapper: CommonAdministrativeAreaLevel2Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonGetAdministrativeAreasLevel2QueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel2Repository,
                    useClass: CommonMockAdministrativeAreaLevel2Repository,
                },
                {
                    provide : CommonGetAdministrativeAreasLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonGetAdministrativeAreasLevel2QueryHandler>(CommonGetAdministrativeAreasLevel2QueryHandler);
        service = module.get<CommonGetAdministrativeAreasLevel2Service>(CommonGetAdministrativeAreasLevel2Service);
        repository = <CommonMockAdministrativeAreaLevel2Repository>module.get<CommonIAdministrativeAreaLevel2Repository>(CommonIAdministrativeAreaLevel2Repository);
        mapper = new CommonAdministrativeAreaLevel2Mapper();
    });

    describe('main', () =>
    {
        test('CommonGetAdministrativeAreasLevel2QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonGetAdministrativeAreasLevel2Query(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});