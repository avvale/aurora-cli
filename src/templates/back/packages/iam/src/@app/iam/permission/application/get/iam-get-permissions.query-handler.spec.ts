import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetPermissionsQueryHandler } from './iam-get-permissions.query-handler';
import { IamMockPermissionRepository } from '@app/iam/permission/infrastructure/mock/iam-mock-permission.repository';
import { IamIPermissionRepository } from '@app/iam/permission/domain/iam-permission.repository';
import { IamPermissionMapper } from '@app/iam/permission/domain/iam-permission.mapper';
import { IamGetPermissionsQuery } from './iam-get-permissions.query';
import { IamGetPermissionsService } from './iam-get-permissions.service';

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