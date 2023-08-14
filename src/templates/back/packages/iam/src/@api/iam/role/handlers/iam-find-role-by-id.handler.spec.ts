/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindRoleByIdHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleByIdHandler', () =>
{
    let handler: IamFindRoleByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindRoleByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamFindRoleByIdHandler>(IamFindRoleByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindRoleByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindRoleByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an role by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleData[0])));
            expect(
                await handler.main(
                    iamMockRoleData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(iamMockRoleData[0]);
        });
    });
});
