/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateBoundedContextByIdInput } from '@api/graphql';
import {
    IamUpdateBoundedContextByIdHandler,
    IamUpdateBoundedContextByIdResolver,
} from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateBoundedContextByIdResolver', () => {
    let resolver: IamUpdateBoundedContextByIdResolver;
    let handler: IamUpdateBoundedContextByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdateBoundedContextByIdResolver,
                {
                    provide: IamUpdateBoundedContextByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdateBoundedContextByIdResolver>(
            IamUpdateBoundedContextByIdResolver,
        );
        handler = module.get<IamUpdateBoundedContextByIdHandler>(
            IamUpdateBoundedContextByIdHandler,
        );
    });

    test('IamUpdateBoundedContextByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdateBoundedContextByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a boundedContext by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockBoundedContextData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <IamUpdateBoundedContextByIdInput>(
                        iamMockBoundedContextData[0]
                    ),
                ),
            ).toBe(iamMockBoundedContextData[0]);
        });
    });
});
