/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpsertAdministrativeAreaLevel3Handler } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAdministrativeAreaLevel3Handler', () =>
{
    let handler: CommonUpsertAdministrativeAreaLevel3Handler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpsertAdministrativeAreaLevel3Handler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonUpsertAdministrativeAreaLevel3Handler>(CommonUpsertAdministrativeAreaLevel3Handler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('CommonUpsertAdministrativeAreaLevel3Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(
                await handler.main(
                    commonMockAdministrativeAreaLevel3Data[0],
                    'Europe/Madrid',
                ))
                .toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});
