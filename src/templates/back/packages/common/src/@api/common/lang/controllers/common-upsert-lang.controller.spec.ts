/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpsertLangController } from './common-upsert-lang.controller';
import { CommonUpsertLangHandler } from '../handlers/common-upsert-lang.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';

describe('CommonUpsertLangController', () =>
{
    let controller: CommonUpsertLangController;
    let handler: CommonUpsertLangHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpsertLangController,
            ],
            providers: [
                {
                    provide : CommonUpsertLangHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpsertLangController>(CommonUpsertLangController);
        handler = module.get<CommonUpsertLangHandler>(CommonUpsertLangHandler);
    });

    describe('main', () =>
    {
        test('CommonUpsertLangController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an lang upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await controller.main(langs[0])).toBe(langs[0]);
        });
    });
});