import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindRoleByIdQueryHandler } from './find-role-by-id.query-handler';
import { MockRoleRepository } from '../../../../../@apps/iam/role/infrastructure/mock/mock-role.repository';
import { roles } from '../../../../../@apps/iam/role/infrastructure/seeds/role.seed';
import { IRoleRepository } from '../../../../../@apps/iam/role/domain/role.repository';
import { RoleMapper } from '../../../../../@apps/iam/role/domain/role.mapper';
import { FindRoleByIdQuery } from './find-role-by-id.query';
import { FindRoleByIdService } from './find-role-by-id.service';

describe('FindRoleByIdQueryHandler', () =>
{
    let queryHandler: FindRoleByIdQueryHandler;
    let service: FindRoleByIdService;
    let repository: MockRoleRepository;
    let mapper: RoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindRoleByIdQueryHandler,
                {
                    provide : IRoleRepository,
                    useClass: MockRoleRepository
                },
                {
                    provide : FindRoleByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindRoleByIdQueryHandler>(FindRoleByIdQueryHandler);
        service         = module.get<FindRoleByIdService>(FindRoleByIdService);
        repository      = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);
        mapper          = new RoleMapper();
    });

    describe('main', () =>
    {
        test('FindRoleByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an role founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindRoleByIdQuery(
                    roles[0].id,

                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});