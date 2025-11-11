/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindRoleHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleHandler', () => {
    let handler: IamFindRoleHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindRoleHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamFindRoleHandler>(IamFindRoleHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindRoleHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamFindRoleHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a role', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockRoleData[0])),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                iamMockRoleData[0],
            );
        });
    });
});
