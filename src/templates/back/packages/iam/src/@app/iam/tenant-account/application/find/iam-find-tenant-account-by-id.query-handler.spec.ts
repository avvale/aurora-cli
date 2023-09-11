import { IamFindTenantAccountByIdQuery, IamITenantAccountRepository, iamMockTenantAccountData, IamMockTenantAccountRepository, IamTenantAccountMapper } from '@app/iam/tenant-account';
import { IamFindTenantAccountByIdQueryHandler } from '@app/iam/tenant-account/application/find/iam-find-tenant-account-by-id.query-handler';
import { IamFindTenantAccountByIdService } from '@app/iam/tenant-account/application/find/iam-find-tenant-account-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantAccountByIdQueryHandler', () =>
{
    let queryHandler: IamFindTenantAccountByIdQueryHandler;
    let service: IamFindTenantAccountByIdService;
    let repository: IamMockTenantAccountRepository;
    let mapper: IamTenantAccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindTenantAccountByIdQueryHandler,
                {
                    provide : IamITenantAccountRepository,
                    useClass: IamMockTenantAccountRepository,
                },
                {
                    provide : IamFindTenantAccountByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamFindTenantAccountByIdQueryHandler>(IamFindTenantAccountByIdQueryHandler);
        service = module.get<IamFindTenantAccountByIdService>(IamFindTenantAccountByIdService);
        repository = <IamMockTenantAccountRepository>module.get<IamITenantAccountRepository>(IamITenantAccountRepository);
        mapper = new IamTenantAccountMapper();
    });

    describe('main', () =>
    {
        test('FindTenantAccountByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenantAccount founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new IamFindTenantAccountByIdQuery(
                    iamMockTenantAccountData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
