import { CommonUpsertAdministrativeAreaLevel1Controller, CommonUpsertAdministrativeAreaLevel1Handler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAdministrativeAreaLevel1Controller', () =>
{
    let controller: CommonUpsertAdministrativeAreaLevel1Controller;
    let handler: CommonUpsertAdministrativeAreaLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpsertAdministrativeAreaLevel1Controller,
            ],
            providers: [
                {
                    provide : CommonUpsertAdministrativeAreaLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpsertAdministrativeAreaLevel1Controller>(CommonUpsertAdministrativeAreaLevel1Controller);
        handler = module.get<CommonUpsertAdministrativeAreaLevel1Handler>(CommonUpsertAdministrativeAreaLevel1Handler);
    });

    describe('main', () =>
    {
        test('CommonUpsertAdministrativeAreaLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data[0])));
            expect(await controller.main(commonMockAdministrativeAreaLevel1Data[0])).toBe(commonMockAdministrativeAreaLevel1Data[0]);
        });
    });
});
