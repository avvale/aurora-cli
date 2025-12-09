/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportDeleteCommentByIdController,
    SupportDeleteCommentByIdHandler,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteCommentByIdController', () => {
    let controller: SupportDeleteCommentByIdController;
    let handler: SupportDeleteCommentByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [SupportDeleteCommentByIdController],
            providers: [
                {
                    provide: SupportDeleteCommentByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<SupportDeleteCommentByIdController>(
            SupportDeleteCommentByIdController,
        );
        handler = module.get<SupportDeleteCommentByIdHandler>(
            SupportDeleteCommentByIdHandler,
        );
    });

    describe('main', () => {
        test('SupportDeleteCommentByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an comment deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(supportMockCommentData[0]),
                    ),
            );
            expect(await controller.main(supportMockCommentData[0].id)).toBe(
                supportMockCommentData[0],
            );
        });
    });
});
