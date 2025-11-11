/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeletePermissionsHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionsHandler', () => {
    let handler: IamDeletePermissionsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeletePermissionsHandler,
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

        handler = module.get<IamDeletePermissionsHandler>(
            IamDeletePermissionsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamDeletePermissionsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamDeletePermissionsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an iamMockPermissionData deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockPermissionData)),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                iamMockPermissionData,
            );
        });
    });
});
