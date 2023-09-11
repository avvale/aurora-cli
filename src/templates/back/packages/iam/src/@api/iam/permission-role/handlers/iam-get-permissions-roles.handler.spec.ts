/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetPermissionsRolesHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetPermissionsRolesHandler', () =>
{
    let handler: IamGetPermissionsRolesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetPermissionsRolesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamGetPermissionsRolesHandler>(IamGetPermissionsRolesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamGetPermissionsRolesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetPermissionsRolesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a iamMockPermissionRoleData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockPermissionRoleData);
        });
    });
});
