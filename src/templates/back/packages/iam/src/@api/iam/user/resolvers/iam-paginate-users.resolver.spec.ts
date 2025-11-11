/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamPaginateUsersHandler,
    IamPaginateUsersResolver,
} from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateUsersResolver', () => {
    let resolver: IamPaginateUsersResolver;
    let handler: IamPaginateUsersHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamPaginateUsersResolver,
                {
                    provide: IamPaginateUsersHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamPaginateUsersResolver>(
            IamPaginateUsersResolver,
        );
        handler = module.get<IamPaginateUsersHandler>(IamPaginateUsersHandler);
    });

    test('IamPaginateUsersResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamPaginateUsersResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a iamMockUserData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: iamMockUserData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: iamMockUserData,
            });
        });
    });
});
