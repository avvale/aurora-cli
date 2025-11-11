import {
    IamFindPermissionByIdQuery,
    IamIPermissionRepository,
    iamMockPermissionData,
    IamMockPermissionRepository,
    IamPermissionMapper,
} from '@app/iam/permission';
import { IamFindPermissionByIdQueryHandler } from '@app/iam/permission/application/find/iam-find-permission-by-id.query-handler';
import { IamFindPermissionByIdService } from '@app/iam/permission/application/find/iam-find-permission-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionByIdQueryHandler', () => {
    let queryHandler: IamFindPermissionByIdQueryHandler;
    let service: IamFindPermissionByIdService;
    let repository: IamMockPermissionRepository;
    let mapper: IamPermissionMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindPermissionByIdQueryHandler,
                {
                    provide: IamIPermissionRepository,
                    useClass: IamMockPermissionRepository,
                },
                {
                    provide: IamFindPermissionByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamFindPermissionByIdQueryHandler>(
            IamFindPermissionByIdQueryHandler,
        );
        service = module.get<IamFindPermissionByIdService>(
            IamFindPermissionByIdService,
        );
        repository = <IamMockPermissionRepository>(
            module.get<IamIPermissionRepository>(IamIPermissionRepository)
        );
        mapper = new IamPermissionMapper();
    });

    describe('main', () => {
        test('FindPermissionByIdQueryHandler should be defined', () => {
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
                await queryHandler.execute(
                    new IamFindPermissionByIdQuery(iamMockPermissionData[0].id),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
