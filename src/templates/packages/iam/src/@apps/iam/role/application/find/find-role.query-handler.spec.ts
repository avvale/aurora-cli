import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindRoleQueryHandler } from './find-role.query-handler';
import { MockRoleRepository } from '../../../../../@apps/iam/role/infrastructure/mock/mock-role.repository';
import { IRoleRepository } from '../../../../../@apps/iam/role/domain/role.repository';
import { RoleMapper } from '../../../../../@apps/iam/role/domain/role.mapper';
import { FindRoleQuery } from './find-role.query';
import { FindRoleService } from './find-role.service';

describe('FindRoleQueryHandler', () =>
{
    let queryHandler: FindRoleQueryHandler;
    let service: FindRoleService;
    let repository: MockRoleRepository;
    let mapper: RoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindRoleQueryHandler,
                {
                    provide : IRoleRepository,
                    useClass: MockRoleRepository
                },
                {
                    provide : FindRoleService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindRoleQueryHandler>(FindRoleQueryHandler);
        service         = module.get<FindRoleService>(FindRoleService);
        repository      = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);
        mapper          = new RoleMapper();
    });

    describe('main', () =>
    {
        test('FindRoleQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an role founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindRoleQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});