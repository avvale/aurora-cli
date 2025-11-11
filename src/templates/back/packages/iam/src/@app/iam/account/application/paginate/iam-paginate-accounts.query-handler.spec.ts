import {
    IamIAccountRepository,
    IamMockAccountRepository,
    IamPaginateAccountsQuery,
} from '@app/iam/account';
import { IamPaginateAccountsQueryHandler } from '@app/iam/account/application/paginate/iam-paginate-accounts.query-handler';
import { IamPaginateAccountsService } from '@app/iam/account/application/paginate/iam-paginate-accounts.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateAccountsQueryHandler', () => {
    let queryHandler: IamPaginateAccountsQueryHandler;
    let service: IamPaginateAccountsService;
    let repository: IamMockAccountRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamPaginateAccountsQueryHandler,
                {
                    provide: IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide: IamPaginateAccountsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamPaginateAccountsQueryHandler>(
            IamPaginateAccountsQueryHandler,
        );
        service = module.get<IamPaginateAccountsService>(
            IamPaginateAccountsService,
        );
        repository = <IamMockAccountRepository>(
            module.get<IamIAccountRepository>(IamIAccountRepository)
        );
    });

    describe('main', () => {
        test('IamPaginateAccountsQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accounts paginated', async () => {
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
                    new IamPaginateAccountsQuery({
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
