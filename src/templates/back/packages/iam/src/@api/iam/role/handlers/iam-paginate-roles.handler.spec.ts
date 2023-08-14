/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateRolesHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateRolesHandler', () =>
{
    let handler: IamPaginateRolesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateRolesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamPaginateRolesHandler>(IamPaginateRolesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamPaginateRolesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateRolesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a roles', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: iamMockRoleData.length,
                count: iamMockRoleData.length,
                rows : iamMockRoleData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: iamMockRoleData.length,
                    count: iamMockRoleData.length,
                    rows : iamMockRoleData,
                });
        });
    });
});
