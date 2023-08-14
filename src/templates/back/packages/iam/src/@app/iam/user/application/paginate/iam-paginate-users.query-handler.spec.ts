import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { IamPaginateUsersQueryHandler } from './iam-paginate-users.query-handler';
import { IamMockUserRepository } from '@app/iam/user/infrastructure/mock/iam-mock-user.repository';
import { IamIUserRepository } from '@app/iam/user/domain/iam-user.repository';
import { IamUserMapper } from '@app/iam/user/domain/iam-user.mapper';
import { IamPaginateUsersQuery } from './iam-paginate-users.query';
import { IamPaginateUsersService } from './iam-paginate-users.service';

describe('IamPaginateUsersQueryHandler', () =>
{
    let queryHandler: IamPaginateUsersQueryHandler;
    let service: IamPaginateUsersService;
    let repository: IamMockUserRepository;
    let mapper: IamUserMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamPaginateUsersQueryHandler,
                {
                    provide : IamIUserRepository,
                    useClass: IamMockUserRepository,
                },
                {
                    provide : IamPaginateUsersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamPaginateUsersQueryHandler>(IamPaginateUsersQueryHandler);
        service = module.get<IamPaginateUsersService>(IamPaginateUsersService);
        repository = <IamMockUserRepository>module.get<IamIUserRepository>(IamIUserRepository);
        mapper = new IamUserMapper();
    });

    describe('main', () =>
    {
        test('IamPaginateUsersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an users paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new IamPaginateUsersQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
