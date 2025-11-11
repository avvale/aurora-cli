import {
    IamFindPermissionRoleQuery,
    IamIPermissionRoleRepository,
    IamMockPermissionRoleRepository,
    IamPermissionRoleMapper,
} from '@app/iam/permission-role';
import { IamFindPermissionRoleQueryHandler } from '@app/iam/permission-role/application/find/iam-find-permission-role.query-handler';
import { IamFindPermissionRoleService } from '@app/iam/permission-role/application/find/iam-find-permission-role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionRoleQueryHandler', () => {
    let queryHandler: IamFindPermissionRoleQueryHandler;
    let service: IamFindPermissionRoleService;
    let repository: IamMockPermissionRoleRepository;
    let mapper: IamPermissionRoleMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindPermissionRoleQueryHandler,
                {
                    provide: IamIPermissionRoleRepository,
                    useClass: IamMockPermissionRoleRepository,
                },
                {
                    provide: IamFindPermissionRoleService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamFindPermissionRoleQueryHandler>(
            IamFindPermissionRoleQueryHandler,
        );
        service = module.get<IamFindPermissionRoleService>(
            IamFindPermissionRoleService,
        );
        repository = <IamMockPermissionRoleRepository>(
            module.get<IamIPermissionRoleRepository>(
                IamIPermissionRoleRepository,
            )
        );
        mapper = new IamPermissionRoleMapper();
    });

    describe('main', () => {
        test('IamFindPermissionRoleQueryHandler should be defined', () => {
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
                await queryHandler.execute(new IamFindPermissionRoleQuery()),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
