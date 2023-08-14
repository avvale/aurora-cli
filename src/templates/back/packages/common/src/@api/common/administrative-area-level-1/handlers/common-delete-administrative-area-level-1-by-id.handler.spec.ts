/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAdministrativeAreaLevel1ByIdHandler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel1ByIdController', () =>
{
    let handler: CommonDeleteAdministrativeAreaLevel1ByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAdministrativeAreaLevel1ByIdHandler,
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

        handler = module.get<CommonDeleteAdministrativeAreaLevel1ByIdHandler>(CommonDeleteAdministrativeAreaLevel1ByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel1ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data[0])));
            expect(
                await handler.main(
                    commonMockAdministrativeAreaLevel1Data[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAdministrativeAreaLevel1Data[0]);
        });
    });
});
