import { CommonUpsertAdministrativeAreaLevel2Controller, CommonUpsertAdministrativeAreaLevel2Handler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAdministrativeAreaLevel2Controller', () =>
{
    let controller: CommonUpsertAdministrativeAreaLevel2Controller;
    let handler: CommonUpsertAdministrativeAreaLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpsertAdministrativeAreaLevel2Controller,
            ],
            providers: [
                {
                    provide : CommonUpsertAdministrativeAreaLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpsertAdministrativeAreaLevel2Controller>(CommonUpsertAdministrativeAreaLevel2Controller);
        handler = module.get<CommonUpsertAdministrativeAreaLevel2Handler>(CommonUpsertAdministrativeAreaLevel2Handler);
    });

    describe('main', () =>
    {
        test('CommonUpsertAdministrativeAreaLevel2Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel2Data[0])));
            expect(await controller.main(commonMockAdministrativeAreaLevel2Data[0])).toBe(commonMockAdministrativeAreaLevel2Data[0]);
        });
    });
});
