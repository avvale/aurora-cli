import {
    IamFindPermissionQuery,
    IamIPermissionRepository,
    IamMockPermissionRepository,
    IamPermissionMapper,
} from '@app/iam/permission';
import { IamFindPermissionQueryHandler } from '@app/iam/permission/application/find/iam-find-permission.query-handler';
import { IamFindPermissionService } from '@app/iam/permission/application/find/iam-find-permission.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionQueryHandler', () => {
    let queryHandler: IamFindPermissionQueryHandler;
    let service: IamFindPermissionService;
    let repository: IamMockPermissionRepository;
    let mapper: IamPermissionMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindPermissionQueryHandler,
                {
                    provide: IamIPermissionRepository,
                    useClass: IamMockPermissionRepository,
                },
                {
                    provide: IamFindPermissionService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamFindPermissionQueryHandler>(
            IamFindPermissionQueryHandler,
        );
        service = module.get<IamFindPermissionService>(
            IamFindPermissionService,
        );
        repository = <IamMockPermissionRepository>(
            module.get<IamIPermissionRepository>(IamIPermissionRepository)
        );
        mapper = new IamPermissionMapper();
    });

    describe('main', () => {
        test('IamFindPermissionQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permission founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(new IamFindPermissionQuery()),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
