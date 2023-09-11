/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateRolesAccountsHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateRolesAccountsHandler', () =>
{
    let handler: IamPaginateRolesAccountsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateRolesAccountsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamPaginateRolesAccountsHandler>(IamPaginateRolesAccountsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamPaginateRolesAccountsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateRolesAccountsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a rolesAccounts', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: iamMockRoleAccountData.length,
                count: iamMockRoleAccountData.length,
                rows : iamMockRoleAccountData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: iamMockRoleAccountData.length,
                    count: iamMockRoleAccountData.length,
                    rows : iamMockRoleAccountData,
                });
        });
    });
});
