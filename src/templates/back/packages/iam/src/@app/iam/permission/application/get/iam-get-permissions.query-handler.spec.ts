import { IamGetPermissionsQuery, IamIPermissionRepository, IamMockPermissionRepository, IamPermissionMapper } from '@app/iam/permission';
import { IamGetPermissionsQueryHandler } from '@app/iam/permission/application/get/iam-get-permissions.query-handler';
import { IamGetPermissionsService } from '@app/iam/permission/application/get/iam-get-permissions.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetPermissionsQueryHandler', () =>
{
    let queryHandler: IamGetPermissionsQueryHandler;
    let service: IamGetPermissionsService;
    let repository: IamMockPermissionRepository;
    let mapper: IamPermissionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamGetPermissionsQueryHandler,
                {
                    provide : IamIPermissionRepository,
                    useClass: IamMockPermissionRepository,
                },
                {
                    provide : IamGetPermissionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamGetPermissionsQueryHandler>(IamGetPermissionsQueryHandler);
        service = module.get<IamGetPermissionsService>(IamGetPermissionsService);
        repository = <IamMockPermissionRepository>module.get<IamIPermissionRepository>(IamIPermissionRepository);
        mapper = new IamPermissionMapper();
    });

    describe('main', () =>
    {
        test('IamGetPermissionsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permissions founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamGetPermissionsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
