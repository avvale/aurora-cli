/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportGetCommentsHandler,
    SupportGetCommentsResolver,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportGetCommentsResolver', () => {
    let resolver: SupportGetCommentsResolver;
    let handler: SupportGetCommentsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportGetCommentsResolver,
                {
                    provide: SupportGetCommentsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<SupportGetCommentsResolver>(
            SupportGetCommentsResolver,
        );
        handler = module.get<SupportGetCommentsHandler>(
            SupportGetCommentsHandler,
        );
    });

    test('SupportGetCommentsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('SupportGetCommentsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a supportMockCommentData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(supportMockCommentData)),
            );
            expect(await resolver.main()).toBe(supportMockCommentData);
        });
    });
});
