# GraphQL Testing

## GraphQL Mutations and Queries

```typescript
describe('Tesla GraphQL E2E', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Mutations', () => {
        it('createTeslaModel - should create new model', () => {
            const mutation = `
                mutation {
                    createTeslaModel(input: {
                        name: "Cybertruck"
                        description: "Futuristic pickup truck"
                        price: 79990
                        isActive: true
                    }) {
                        id
                        name
                        price
                        createdAt
                    }
                }
            `;

            return request(app.getHttpServer())
                .post('/graphql')
                .send({ query: mutation })
                .set('Accept', 'application/json')
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.createTeslaModel).toHaveProperty('id');
                    expect(res.body.data.createTeslaModel.name).toBe('Cybertruck');
                    expect(res.body.errors).toBeUndefined();
                });
        });

        it('createTeslaModel - should return error for invalid data', () => {
            const mutation = `
                mutation {
                    createTeslaModel(input: {
                        name: null
                        price: -100
                    }) {
                        id
                        name
                    }
                }
            `;

            return request(app.getHttpServer())
                .post('/graphql')
                .send({ query: mutation })
                .expect(200)
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                });
        });

        it('updateTeslaModel - should update existing model', async () => {
            const createMutation = `
                mutation {
                    createTeslaModel(input: {
                        name: "Roadster"
                        price: 200000
                        isActive: true
                    }) { id }
                }
            `;

            const createRes = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: createMutation });

            const modelId = createRes.body.data.createTeslaModel.id;

            const updateMutation = `
                mutation {
                    updateTeslaModel(input: {
                        id: "${modelId}"
                        price: 250000
                    }) { id, price }
                }
            `;

            return request(app.getHttpServer())
                .post('/graphql')
                .send({ query: updateMutation })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.updateTeslaModel.price).toBe(250000);
                });
        });
    });

    describe('Queries', () => {
        let teslaId: string;

        beforeEach(async () => {
            const mutation = `
                mutation {
                    createTeslaModel(input: {
                        name: "Model 3"
                        price: 42990
                        isActive: true
                    }) { id }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: mutation });

            teslaId = res.body.data.createTeslaModel.id;
        });

        it('findTeslaModelById - should return model by id', () => {
            const query = `
                query {
                    findTeslaModelById(id: "${teslaId}") {
                        id, name, price, isActive
                    }
                }
            `;

            return request(app.getHttpServer())
                .post('/graphql')
                .send({ query })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.findTeslaModelById.id).toBe(teslaId);
                    expect(res.body.data.findTeslaModelById.name).toBe('Model 3');
                });
        });

        it('paginateTeslaModels - should return paginated results', () => {
            const query = `
                query {
                    paginateTeslaModels(limit: 10, offset: 0) {
                        data { id, name }
                        total
                        count
                    }
                }
            `;

            return request(app.getHttpServer())
                .post('/graphql')
                .send({ query })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.paginateTeslaModels).toHaveProperty('data');
                    expect(res.body.data.paginateTeslaModels).toHaveProperty('total');
                    expect(Array.isArray(res.body.data.paginateTeslaModels.data)).toBe(true);
                });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
```
