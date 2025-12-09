/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportFindCommentHandler,
    SupportFindCommentResolver,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindCommentResolver', () => {
    let resolver: SupportFindCommentResolver;
    let handler: SupportFindCommentHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportFindCommentResolver,
                {
                    provide: SupportFindCommentHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<SupportFindCommentResolver>(
            SupportFindCommentResolver,
        );
        handler = module.get<SupportFindCommentHandler>(
            SupportFindCommentHandler,
        );
    });

    test('SupportFindCommentResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('SupportFindCommentResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a comment', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(supportMockCommentData[0]),
                    ),
            );
            expect(await resolver.main()).toBe(supportMockCommentData[0]);
        });
    });
});
