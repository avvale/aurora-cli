# E2E Testing Patterns

## Testing REST Controllers

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

describe('TeslaController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /tesla', () => {
        it('should create new tesla', () => {
            return request(app.getHttpServer())
                .post('/tesla')
                .send({ model: 'Model Y', year: 2023, price: 52990, isActive: true })
                .expect(201)
                .expect((res) => {
                    expect(res.body).toHaveProperty('id');
                    expect(res.body.model).toBe('Model Y');
                });
        });

        it('should return 400 when validation fails', () => {
            return request(app.getHttpServer())
                .post('/tesla')
                .send({ model: '', year: 2023, price: 52990 })
                .expect(400);
        });
    });

    describe('GET /tesla/:id', () => {
        it('should return tesla by id', async () => {
            const createRes = await request(app.getHttpServer())
                .post('/tesla')
                .send({ model: 'Cybertruck', year: 2024, price: 79990, isActive: true });

            return request(app.getHttpServer())
                .get(`/tesla/${createRes.body.id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.model).toBe('Cybertruck');
                });
        });

        it('should return 404 when not found', () => {
            return request(app.getHttpServer())
                .get('/tesla/non-existent-id')
                .expect(404);
        });
    });

    describe('DELETE /tesla/:id', () => {
        it('should delete tesla', async () => {
            const createRes = await request(app.getHttpServer())
                .post('/tesla')
                .send({ model: 'Model X', year: 2023, price: 79990, isActive: true });

            await request(app.getHttpServer())
                .delete(`/tesla/${createRes.body.id}`)
                .expect(200);

            return request(app.getHttpServer())
                .get(`/tesla/${createRes.body.id}`)
                .expect(404);
        });
    });
});
```

## Testing GraphQL Resolvers

```typescript
describe('TeslaResolver (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('createTesla mutation', () => {
        it('should create tesla via GraphQL', () => {
            const mutation = `
                mutation {
                    createTesla(input: {
                        model: "Model S Plaid"
                        year: 2023
                        price: 129990
                        isActive: true
                    }) { id, model, year, price }
                }
            `;

            return request(app.getHttpServer())
                .post('/graphql')
                .send({ query: mutation })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.createTesla).toHaveProperty('id');
                    expect(res.body.data.createTesla.model).toBe('Model S Plaid');
                });
        });
    });

    describe('findTeslaById query', () => {
        it('should find tesla by id', async () => {
            const createMutation = `
                mutation {
                    createTesla(input: {
                        model: "Model 3 Performance"
                        year: 2023
                        price: 53990
                        isActive: true
                    }) { id }
                }
            `;

            const createRes = await request(app.getHttpServer())
                .post('/graphql')
                .send({ query: createMutation });

            const teslaId = createRes.body.data.createTesla.id;

            const query = `
                query {
                    findTeslaById(id: "${teslaId}") { id, model, year, price }
                }
            `;

            return request(app.getHttpServer())
                .post('/graphql')
                .send({ query })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.findTeslaById.id).toBe(teslaId);
                });
        });
    });
});
```
