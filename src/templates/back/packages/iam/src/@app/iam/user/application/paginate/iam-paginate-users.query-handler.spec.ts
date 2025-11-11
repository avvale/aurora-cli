import {
    IamIUserRepository,
    IamMockUserRepository,
    IamPaginateUsersQuery,
} from '@app/iam/user';
import { IamPaginateUsersQueryHandler } from '@app/iam/user/application/paginate/iam-paginate-users.query-handler';
import { IamPaginateUsersService } from '@app/iam/user/application/paginate/iam-paginate-users.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateUsersQueryHandler', () => {
    let queryHandler: IamPaginateUsersQueryHandler;
    let service: IamPaginateUsersService;
    let repository: IamMockUserRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamPaginateUsersQueryHandler,
                {
                    provide: IamIUserRepository,
                    useClass: IamMockUserRepository,
                },
                {
                    provide: IamPaginateUsersService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamPaginateUsersQueryHandler>(
            IamPaginateUsersQueryHandler,
        );
        service = module.get<IamPaginateUsersService>(IamPaginateUsersService);
        repository = <IamMockUserRepository>(
            module.get<IamIUserRepository>(IamIUserRepository)
        );
    });

    describe('main', () => {
        test('IamPaginateUsersQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an users paginated', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            count: 10,
                            total: 100,
                            rows: repository.collectionSource.slice(0, 10),
                        }),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new IamPaginateUsersQuery({
                        offset: 0,
                        limit: 10,
                    }),
                ),
            ).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource
                        .slice(0, 10)
                        .map((item) => item.toDTO()),
                ),
            );
        });
    });
});
