# Authentication Testing

## JWT Bearer Token Authentication

```typescript
describe('Authentication - JWT', () => {
    let app: INestApplication;
    let accessToken: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Login Flow', () => {
        it('POST /auth/login - should obtain access token', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: 'admin',
                    password: 'SecurePass123!',
                })
                .set('Content-Type', 'application/json')
                .expect(200);

            expect(response.body).toHaveProperty('access_token');
            expect(response.body).toHaveProperty('token_type', 'Bearer');
            accessToken = response.body.access_token;
        });

        it('POST /auth/login - should fail with invalid credentials', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: 'admin',
                    password: 'wrongpassword',
                })
                .expect(401)
                .expect((res) => {
                    expect(res.body.message).toContain('Unauthorized');
                });
        });
    });

    describe('Protected Routes', () => {
        it('GET /profile - should access with valid token', () => {
            return request(app.getHttpServer())
                .get('/profile')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body).toHaveProperty('userId');
                    expect(res.body.username).toBe('admin');
                });
        });

        it('GET /profile - should fail without token', () => {
            return request(app.getHttpServer())
                .get('/profile')
                .expect(401);
        });

        it('GET /profile - should fail with invalid token', () => {
            return request(app.getHttpServer())
                .get('/profile')
                .set('Authorization', 'Bearer invalid_token_here')
                .expect(401);
        });
    });

    describe('Token Refresh', () => {
        let refreshToken: string;

        it('POST /auth/refresh - should refresh access token', async () => {
            const loginRes = await request(app.getHttpServer())
                .post('/auth/login')
                .send({ username: 'admin', password: 'SecurePass123!' });

            refreshToken = loginRes.body.refresh_token;

            const response = await request(app.getHttpServer())
                .post('/auth/refresh')
                .send({ refresh_token: refreshToken })
                .expect(200);

            expect(response.body).toHaveProperty('access_token');
            expect(response.body.access_token).not.toBe(accessToken);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
```

## API Key Authentication

```typescript
describe('Authentication - API Key', () => {
    const validApiKey = 'sk_test_1234567890abcdef';

    it('GET /api/data - with valid API key in header', () => {
        return request(app.getHttpServer())
            .get('/api/data')
            .set('X-API-Key', validApiKey)
            .expect(200);
    });

    it('GET /api/data - with valid API key in query', () => {
        return request(app.getHttpServer())
            .get('/api/data')
            .query({ api_key: validApiKey })
            .expect(200);
    });

    it('GET /api/data - without API key should fail', () => {
        return request(app.getHttpServer())
            .get('/api/data')
            .expect(401);
    });
});
```
