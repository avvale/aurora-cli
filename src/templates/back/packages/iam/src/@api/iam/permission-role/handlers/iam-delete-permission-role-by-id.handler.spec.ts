/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeletePermissionRoleByIdHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionRoleByIdController', () =>
{
    let handler: IamDeletePermissionRoleByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeletePermissionRoleByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamDeletePermissionRoleByIdHandler>(IamDeletePermissionRoleByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamDeletePermissionRoleByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an permissionRole deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData[0])));
            expect(
                await handler.main(
                    iamMockPermissionRoleData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockPermissionRoleData[0]);
        });
    });
});
