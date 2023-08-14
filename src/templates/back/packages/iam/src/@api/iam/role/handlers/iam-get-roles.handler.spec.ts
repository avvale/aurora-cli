/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetRolesHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetRolesHandler', () =>
{
    let handler: IamGetRolesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetRolesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamGetRolesHandler>(IamGetRolesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamGetRolesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetRolesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a iamMockRoleData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockRoleData);
        });
    });
});
