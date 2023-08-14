/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAdministrativeAreaLevel1ByIdHandler } from '@api/common/administrative-area-level-1';
import { CommonUpdateAdministrativeAreaLevel1ByIdInput } from '@api/graphql';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreaLevel1ByIdHandler', () =>
{
    let handler: CommonUpdateAdministrativeAreaLevel1ByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreaLevel1ByIdHandler,
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

        handler = module.get<CommonUpdateAdministrativeAreaLevel1ByIdHandler>(CommonUpdateAdministrativeAreaLevel1ByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonUpdateAdministrativeAreaLevel1ByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel1ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreaLevel1 updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data[0])));
            expect(
                await handler.main(
                    <CommonUpdateAdministrativeAreaLevel1ByIdInput>commonMockAdministrativeAreaLevel1Data[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(commonMockAdministrativeAreaLevel1Data[0]);
        });
    });
});
