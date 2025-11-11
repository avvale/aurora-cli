import {
    IamFindPermissionRoleByIdQuery,
    IamIPermissionRoleRepository,
    iamMockPermissionRoleData,
    IamMockPermissionRoleRepository,
    IamPermissionRoleMapper,
} from '@app/iam/permission-role';
import { IamFindPermissionRoleByIdQueryHandler } from '@app/iam/permission-role/application/find/iam-find-permission-role-by-id.query-handler';
import { IamFindPermissionRoleByIdService } from '@app/iam/permission-role/application/find/iam-find-permission-role-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionRoleByIdQueryHandler', () => {
    let queryHandler: IamFindPermissionRoleByIdQueryHandler;
    let service: IamFindPermissionRoleByIdService;
    let repository: IamMockPermissionRoleRepository;
    let mapper: IamPermissionRoleMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindPermissionRoleByIdQueryHandler,
                {
                    provide: IamIPermissionRoleRepository,
                    useClass: IamMockPermissionRoleRepository,
                },
                {
                    provide: IamFindPermissionRoleByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamFindPermissionRoleByIdQueryHandler>(
            IamFindPermissionRoleByIdQueryHandler,
        );
        service = module.get<IamFindPermissionRoleByIdService>(
            IamFindPermissionRoleByIdService,
        );
        repository = <IamMockPermissionRoleRepository>(
            module.get<IamIPermissionRoleRepository>(
                IamIPermissionRoleRepository,
            )
        );
        mapper = new IamPermissionRoleMapper();
    });

    describe('main', () => {
        test('FindPermissionRoleByIdQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permissionRole founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new IamFindPermissionRoleByIdQuery(
                        iamMockPermissionRoleData[0].id,
                    ),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
