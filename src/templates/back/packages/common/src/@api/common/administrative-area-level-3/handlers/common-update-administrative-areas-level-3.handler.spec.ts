/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { CommonUpdateAdministrativeAreasLevel3Input } from '@api/graphql';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreasLevel3Handler', () =>
{
    let handler: CommonUpdateAdministrativeAreasLevel3Handler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreasLevel3Handler,
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

        handler = module.get<CommonUpdateAdministrativeAreasLevel3Handler>(CommonUpdateAdministrativeAreasLevel3Handler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonUpdateAdministrativeAreasLevel3Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreasLevel3Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreasLevel3 updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(
                await handler.main(
                    <CommonUpdateAdministrativeAreasLevel3Input>commonMockAdministrativeAreaLevel3Data[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});
