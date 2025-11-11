import {
    IamITenantRepository,
    IamMockTenantRepository,
    IamRawSQLTenantsQuery,
    IamTenantMapper,
} from '@app/iam/tenant';
import { IamRawSQLTenantsQueryHandler } from '@app/iam/tenant/application/raw-sql/iam-raw-sql-tenants.query-handler';
import { IamRawSQLTenantsService } from '@app/iam/tenant/application/raw-sql/iam-raw-sql-tenants.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLTenantsQueryHandler', () => {
    let queryHandler: IamRawSQLTenantsQueryHandler;
    let service: IamRawSQLTenantsService;
    let repository: IamMockTenantRepository;
    let mapper: IamTenantMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLTenantsQueryHandler,
                {
                    provide: IamITenantRepository,
                    useClass: IamMockTenantRepository,
                },
                {
                    provide: IamRawSQLTenantsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamRawSQLTenantsQueryHandler>(
            IamRawSQLTenantsQueryHandler,
        );
        service = module.get<IamRawSQLTenantsService>(IamRawSQLTenantsService);
        repository = <IamMockTenantRepository>(
            module.get<IamITenantRepository>(IamITenantRepository)
        );
        mapper = new IamTenantMapper();
    });

    describe('main', () => {
        test('IamRawSQLTenantsQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenants founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource),
                    ),
            );
            expect(
                await queryHandler.execute(new IamRawSQLTenantsQuery()),
            ).toStrictEqual(
                mapper.mapAggregatesToResponses(repository.collectionSource),
            );
        });
    });
});
