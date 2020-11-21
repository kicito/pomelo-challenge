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

interface GitHubAPIOptions {}

interface GitHubAPIProps {
	rate: { limit: number; remaining: number; reset: number };
}
