import { IamCreateRolesAccountsHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRolesAccountsHandler', () =>
{
    let handler: IamCreateRolesAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateRolesAccountsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamCreateRolesAccountsHandler>(IamCreateRolesAccountsHandler);
    });

    describe('main', () =>
    {
        test('IamCreateRolesAccountsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an iamMockRoleAccountData created', async () =>
        {
            expect(await handler.main(iamMockRoleAccountData)).toBe(true);
        });
    });
});
