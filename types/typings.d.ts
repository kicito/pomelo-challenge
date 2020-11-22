import { ServerOptions } from '@hapi/hapi';

interface Alg1Input {
	[key: string]: Alg1InputElem[];
}

interface Alg1InputElem {
	id: number;
	title: string;
	level: number;
	children: Alg1InputElem[];
	parent_id: number | null;
}

interface Alg1Request extends Request {
	payload: Alg1Input;
}

type Alg1Output = Array<Alg1InputElem>;

interface PomeloServerIface {
	readonly server: any;
	startServer(): Promise<void>;
	stopServer(): Promise<void>;
}

interface PomeloServerOptions {
	host: string;
	port: string;
	debug: boolean;
	github?: {
		client_id: string;
		secret_id: string;
	};
}

interface GitHubAPIOptions {
	client_id: string;
	secret_id: string;
	base_url: string;
}

interface GitHubAPIProps extends GitHubAPIOptions {
	rate: { limit: number; remaining: number; reset: number };
}

interface Route {
	init(s: Server): Promise<void>;
}
