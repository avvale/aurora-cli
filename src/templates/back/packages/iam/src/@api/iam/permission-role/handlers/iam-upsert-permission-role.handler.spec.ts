/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpsertPermissionRoleHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertPermissionRoleHandler', () =>
{
    let handler: IamUpsertPermissionRoleHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertPermissionRoleHandler,
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

        handler = module.get<IamUpsertPermissionRoleHandler>(IamUpsertPermissionRoleHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamUpsertPermissionRoleHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an permissionRole upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData[0])));
            expect(
                await handler.main(
                    iamMockPermissionRoleData[0],
                    'Europe/Madrid',
                ))
                .toBe(iamMockPermissionRoleData[0]);
        });
    });
});
