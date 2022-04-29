import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindPermissionByIdQueryHandler } from './find-permission-by-id.query-handler';
import { MockPermissionRepository } from '../../../../../@apps/iam/permission/infrastructure/mock/mock-permission.repository';
import { permissions } from '../../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';
import { IPermissionRepository } from '../../../../../@apps/iam/permission/domain/permission.repository';
import { PermissionMapper } from '../../../../../@apps/iam/permission/domain/permission.mapper';
import { FindPermissionByIdQuery } from './find-permission-by-id.query';
import { FindPermissionByIdService } from './find-permission-by-id.service';

describe('FindPermissionByIdQueryHandler', () =>
{
    let queryHandler: FindPermissionByIdQueryHandler;
    let service: FindPermissionByIdService;
    let repository: MockPermissionRepository;
    let mapper: PermissionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindPermissionByIdQueryHandler,
                {
                    provide : IPermissionRepository,
                    useClass: MockPermissionRepository
                },
                {
                    provide : FindPermissionByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindPermissionByIdQueryHandler>(FindPermissionByIdQueryHandler);
        service         = module.get<FindPermissionByIdService>(FindPermissionByIdService);
        repository      = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);
        mapper          = new PermissionMapper();
    });

    describe('main', () =>
    {
        test('FindPermissionByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permission founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindPermissionByIdQuery(
                    permissions[0].id,

                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});