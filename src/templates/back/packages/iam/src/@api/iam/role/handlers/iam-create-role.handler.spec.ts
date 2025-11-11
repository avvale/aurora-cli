/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateRoleHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRoleHandler', () => {
    let handler: IamCreateRoleHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamCreateRoleHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamCreateRoleHandler>(IamCreateRoleHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('IamCreateRoleHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an role created', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockRoleData[0])),
            );
            expect(
                await handler.main(iamMockRoleData[0], 'Europe/Madrid'),
            ).toBe(iamMockRoleData[0]);
        });
    });
});
