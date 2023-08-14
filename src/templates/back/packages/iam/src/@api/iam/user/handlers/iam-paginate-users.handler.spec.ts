/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateUsersHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateUsersHandler', () =>
{
    let handler: IamPaginateUsersHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateUsersHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamPaginateUsersHandler>(IamPaginateUsersHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamPaginateUsersHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateUsersHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a users', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: iamMockUserData.length,
                count: iamMockUserData.length,
                rows : iamMockUserData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: iamMockUserData.length,
                    count: iamMockUserData.length,
                    rows : iamMockUserData,
                });
        });
    });
});
