import PomeloServer from '../main';
import mockingInput from '../../assets/alg1_in.json';

let server: PomeloServer;

beforeEach(async () => {
	server = new PomeloServer({
		port: process.env.SERVER_PORT!,
		host: process.env.SERVER_HOSTNAME!,
		github: {
			client_id: process.env.GH_CLIENT_ID!,
			secret_id: process.env.GH_SECRET_ID!,
		},
		debug: true,
	});
	await server.startServer();
});

afterEach(async () => {
	await server.stopServer();
});

test('GET /', async () => {
	const res = await server.server.inject({
		method: 'GET',
		url: '/',
	});
	expect(res.statusCode).toBe(200);
});

test('POST /alg1', async () => {
	const res = await server.server.inject({
		method: 'POST',
		url: '/alg1',
		payload: mockingInput,
	});
	expect(res.statusCode).toBe(200);
});
