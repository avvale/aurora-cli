import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetPermissionsQueryHandler } from './get-permissions.query-handler';
import { MockPermissionRepository } from '../../../../../@apps/iam/permission/infrastructure/mock/mock-permission.repository';
import { IPermissionRepository } from '../../../../../@apps/iam/permission/domain/permission.repository';
import { PermissionMapper } from '../../../../../@apps/iam/permission/domain/permission.mapper';
import { GetPermissionsQuery } from './get-permissions.query';
import { GetPermissionsService } from './get-permissions.service';

describe('GetPermissionsQueryHandler', () =>
{
    let queryHandler: GetPermissionsQueryHandler;
    let service: GetPermissionsService;
    let repository: MockPermissionRepository;
    let mapper: PermissionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetPermissionsQueryHandler,
                {
                    provide : IPermissionRepository,
                    useClass: MockPermissionRepository
                },
                {
                    provide : GetPermissionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetPermissionsQueryHandler>(GetPermissionsQueryHandler);
        service         = module.get<GetPermissionsService>(GetPermissionsService);
        repository      = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);
        mapper          = new PermissionMapper();
    });

    describe('main', () =>
    {
        test('GetPermissionsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permissions founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetPermissionsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});