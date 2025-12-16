/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportDeleteCommentsHandler,
    SupportDeleteCommentsResolver,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteCommentsResolver', () => {
    let resolver: SupportDeleteCommentsResolver;
    let handler: SupportDeleteCommentsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportDeleteCommentsResolver,
                {
                    provide: SupportDeleteCommentsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<SupportDeleteCommentsResolver>(
            SupportDeleteCommentsResolver,
        );
        handler = module.get<SupportDeleteCommentsHandler>(
            SupportDeleteCommentsHandler,
        );
    });

    test('SupportDeleteCommentsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('SupportDeleteCommentsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an supportMockCommentData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(supportMockCommentData)),
            );
            expect(await resolver.main()).toBe(supportMockCommentData);
        });
    });
});
