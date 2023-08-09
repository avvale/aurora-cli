/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAdministrativeAreaLevel3ByIdHandler } from '@api/common/administrative-area-level-3';
import { CommonUpdateAdministrativeAreaLevel3ByIdInput } from '@api/graphql';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreaLevel3ByIdHandler', () =>
{
    let handler: CommonUpdateAdministrativeAreaLevel3ByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreaLevel3ByIdHandler,
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

        handler = module.get<CommonUpdateAdministrativeAreaLevel3ByIdHandler>(CommonUpdateAdministrativeAreaLevel3ByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonUpdateAdministrativeAreaLevel3ByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel3ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreaLevel3 updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(
                await handler.main(
                    <CommonUpdateAdministrativeAreaLevel3ByIdInput>commonMockAdministrativeAreaLevel3Data[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});
