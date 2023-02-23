import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockPermissionRepository } from '@app/iam/permission/infrastructure/mock/mock-permission.repository';
import { IPermissionRepository } from '@app/iam/permission/domain/permission.repository';
import { PermissionMapper } from '@app/iam/permission/domain/permission.mapper';
import { RawSQLPermissionsQueryHandler } from './raw-sql-permissions.query-handler';
import { RawSQLPermissionsQuery } from './raw-sql-permissions.query';
import { RawSQLPermissionsService } from './raw-sql-permissions.service';

describe('RawSQLPermissionsQueryHandler', () =>
{
    let queryHandler: RawSQLPermissionsQueryHandler;
    let service: RawSQLPermissionsService;
    let repository: MockPermissionRepository;
    let mapper: PermissionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLPermissionsQueryHandler,
                {
                    provide : IPermissionRepository,
                    useClass: MockPermissionRepository,
                },
                {
                    provide : RawSQLPermissionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLPermissionsQueryHandler>(RawSQLPermissionsQueryHandler);
        service         = module.get<RawSQLPermissionsService>(RawSQLPermissionsService);
        repository      = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);
        mapper          = new PermissionMapper();
    });

    describe('main', () =>
    {
        test('RawSQLPermissionsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permissions founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLPermissionsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});