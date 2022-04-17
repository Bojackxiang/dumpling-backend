import JWTUtils from '../jwtUtils';

describe('测试 jwt token utils', () => {
    it('generate jwt token can return encoded token', () => {
        const data = {
            name: 'test',
            age: 18,
        };
        const secret = 'secret';
        const token = JWTUtils.generateJWT(data, secret);
        expect(token).toBeDefined();
    });

    it('JWT token can be parsed ', () => {
        const data = {
            name: 'test',
            age: 18,
        };
        const secret = 'secret';
        const token = JWTUtils.generateJWT(data, secret);
        const decoded = JWTUtils.verifyJWT(token, secret);
        expect(decoded).toBeDefined();
        expect(decoded.data).toEqual(data);
    });

    it('JWT token cannot be parsed when token is not validated', () => {
        try {
            const SECRET = 'secret';
            const testToken = 'sample token';
            JWTUtils.verifyJWT(testToken, SECRET);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('Expired token should be invalid', () => {
        const sampleToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJ0ZXN0IiwiYWdlIjoxOH0sImlhdCI6MTY0ODg3MzU5MiwiZXhwIjoxNjQ4ODczNTkzfQ.-qZqIb6b8PIPOJoF_yM53LPFONi6bWDmOdZVlSEVOc4';

        try {
            const SECRET = 'secret';
            JWTUtils.verifyJWT(sampleToken, SECRET);
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
        }
    });
});
