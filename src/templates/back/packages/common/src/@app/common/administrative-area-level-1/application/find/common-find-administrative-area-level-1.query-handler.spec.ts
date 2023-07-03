import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel1QueryHandler } from './common-find-administrative-area-level-1.query-handler';
import { CommonMockAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.repository';
import { CommonIAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/domain/common-administrative-area-level-1.repository';
import { CommonAdministrativeAreaLevel1Mapper } from '@app/common/administrative-area-level-1/domain/common-administrative-area-level-1.mapper';
import { CommonFindAdministrativeAreaLevel1Query } from './common-find-administrative-area-level-1.query';
import { CommonFindAdministrativeAreaLevel1Service } from './common-find-administrative-area-level-1.service';

describe('CommonFindAdministrativeAreaLevel1QueryHandler', () =>
{
    let queryHandler: CommonFindAdministrativeAreaLevel1QueryHandler;
    let service: CommonFindAdministrativeAreaLevel1Service;
    let repository: CommonMockAdministrativeAreaLevel1Repository;
    let mapper: CommonAdministrativeAreaLevel1Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindAdministrativeAreaLevel1QueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel1Repository,
                    useClass: CommonMockAdministrativeAreaLevel1Repository,
                },
                {
                    provide : CommonFindAdministrativeAreaLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindAdministrativeAreaLevel1QueryHandler>(CommonFindAdministrativeAreaLevel1QueryHandler);
        service = module.get<CommonFindAdministrativeAreaLevel1Service>(CommonFindAdministrativeAreaLevel1Service);
        repository = <CommonMockAdministrativeAreaLevel1Repository>module.get<CommonIAdministrativeAreaLevel1Repository>(CommonIAdministrativeAreaLevel1Repository);
        mapper = new CommonAdministrativeAreaLevel1Mapper();
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel1QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindAdministrativeAreaLevel1Query(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});