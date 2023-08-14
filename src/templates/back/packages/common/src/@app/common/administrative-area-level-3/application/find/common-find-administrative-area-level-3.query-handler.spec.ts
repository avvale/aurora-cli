import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel3QueryHandler } from './common-find-administrative-area-level-3.query-handler';
import { CommonMockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.repository';
import { CommonIAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/domain/common-administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3Mapper } from '@app/common/administrative-area-level-3/domain/common-administrative-area-level-3.mapper';
import { CommonFindAdministrativeAreaLevel3Query } from './common-find-administrative-area-level-3.query';
import { CommonFindAdministrativeAreaLevel3Service } from './common-find-administrative-area-level-3.service';

describe('CommonFindAdministrativeAreaLevel3QueryHandler', () =>
{
    let queryHandler: CommonFindAdministrativeAreaLevel3QueryHandler;
    let service: CommonFindAdministrativeAreaLevel3Service;
    let repository: CommonMockAdministrativeAreaLevel3Repository;
    let mapper: CommonAdministrativeAreaLevel3Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindAdministrativeAreaLevel3QueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useClass: CommonMockAdministrativeAreaLevel3Repository,
                },
                {
                    provide : CommonFindAdministrativeAreaLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindAdministrativeAreaLevel3QueryHandler>(CommonFindAdministrativeAreaLevel3QueryHandler);
        service = module.get<CommonFindAdministrativeAreaLevel3Service>(CommonFindAdministrativeAreaLevel3Service);
        repository = <CommonMockAdministrativeAreaLevel3Repository>module.get<CommonIAdministrativeAreaLevel3Repository>(CommonIAdministrativeAreaLevel3Repository);
        mapper = new CommonAdministrativeAreaLevel3Mapper();
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel3QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindAdministrativeAreaLevel3Query(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
