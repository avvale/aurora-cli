/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindTenantHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantHandler', () => {
    let handler: IamFindTenantHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindTenantHandler,
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

        handler = module.get<IamFindTenantHandler>(IamFindTenantHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamFindTenantHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamFindTenantHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a tenant', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTenantData[0])),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                iamMockTenantData[0],
            );
        });
    });
});
