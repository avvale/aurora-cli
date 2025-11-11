/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeletePermissionByIdHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionByIdController', () => {
    let handler: IamDeletePermissionByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeletePermissionByIdHandler,
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

        handler = module.get<IamDeletePermissionByIdHandler>(
            IamDeletePermissionByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('IamDeletePermissionByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an permission deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(iamMockPermissionData[0])),
            );
            expect(
                await handler.main(
                    iamMockPermissionData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockPermissionData[0]);
        });
    });
});
