/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAdministrativeAreaLevel3ByIdHandler } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel3ByIdHandler', () =>
{
    let handler: CommonFindAdministrativeAreaLevel3ByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAdministrativeAreaLevel3ByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonFindAdministrativeAreaLevel3ByIdHandler>(CommonFindAdministrativeAreaLevel3ByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonFindAdministrativeAreaLevel3ByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel3ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(
                await handler.main(
                    commonMockAdministrativeAreaLevel3Data[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});
