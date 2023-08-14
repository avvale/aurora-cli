/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateAdministrativeAreaLevel3Handler } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreaLevel3Handler', () =>
{
    let handler: CommonCreateAdministrativeAreaLevel3Handler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateAdministrativeAreaLevel3Handler,
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

        handler = module.get<CommonCreateAdministrativeAreaLevel3Handler>(CommonCreateAdministrativeAreaLevel3Handler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreaLevel3Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(
                await handler.main(
                    commonMockAdministrativeAreaLevel3Data[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});
