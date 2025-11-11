/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetTenantsHandler } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetTenantsHandler', () => {
    let handler: IamGetTenantsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamGetTenantsHandler,
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

        handler = module.get<IamGetTenantsHandler>(IamGetTenantsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamGetTenantsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamGetTenantsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a iamMockTenantData', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTenantData)),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                iamMockTenantData,
            );
        });
    });
});
