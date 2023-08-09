/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindResourceByIdHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindResourceByIdHandler', () =>
{
    let handler: CommonFindResourceByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindResourceByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonFindResourceByIdHandler>(CommonFindResourceByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonFindResourceByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindResourceByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an resource by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData[0])));
            expect(
                await handler.main(
                    commonMockResourceData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockResourceData[0]);
        });
    });
});
