export const parseDbUrl = (dbConnectionDetails: {
	schema: string;
	name: string;
	username: string;
	password: string;
	host: string;
	port: number;
}) => {
	const { username, name, password, host, port, schema } = dbConnectionDetails;
	const escapedUsername = encodeURIComponent(username);
	const escapedPassword = encodeURIComponent(password);
	const escapedName = encodeURIComponent(name);
	const escapedHost = encodeURIComponent(host);
	const escapedSchema = encodeURIComponent(schema);
	return `postgres://${escapedUsername}:${escapedPassword}@${escapedHost}:${port}/${escapedName}?search_path=${escapedSchema}`
}
