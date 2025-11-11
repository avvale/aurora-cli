/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindPermissionByIdHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionByIdHandler', () => {
    let handler: IamFindPermissionByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindPermissionByIdHandler,
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

        handler = module.get<IamFindPermissionByIdHandler>(
            IamFindPermissionByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindPermissionByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamFindPermissionByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an permission by id', async () => {
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
