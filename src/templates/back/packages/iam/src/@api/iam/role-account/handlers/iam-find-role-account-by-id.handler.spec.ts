/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindRoleAccountByIdHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleAccountByIdHandler', () => {
    let handler: IamFindRoleAccountByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindRoleAccountByIdHandler,
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

        handler = module.get<IamFindRoleAccountByIdHandler>(
            IamFindRoleAccountByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindRoleAccountByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamFindRoleAccountByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an roleAccount by id', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockRoleAccountData[0]),
                    ),
            );
            expect(
                await handler.main(
                    iamMockRoleAccountData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockRoleAccountData[0]);
        });
    });
});
