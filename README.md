
# Capta Inventory API

A brief description of what this project does and who it's for


## Documentation

[Documentation](https://linktodocumentation)


## Environment Variables

To set up this project, create a copy of the `.env.example` file, rename it to `.env`, and update the values to suit your environment.

Ensure your `.env` file includes the following environment variables:

| Variable        | Required | Default | Description                                                  |
|-----------------|----------|---------|--------------------------------------------------------------|
| **APP_PORT**    | false    | 3000    | The port number on which the application server will listen. |
| **DB_HOST**     | true     |         | The hostname or IP address of the database server.           |
| **DB_PORT**     | true     |         | The port number on which the database server is listening.   |
| **DB_NAME**     | true     |         | The service name (or SID) of the database to connect to.     |
| **DB_USER**     | true     |         | The username for authenticating with the database.           |
| **DB_PASSWORD** | true     |         | The password for authenticating with the database.           |
| **LOG_LEVEL**   | false    | error   | Defines the verbosity of application logs.                   |


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## License

[MIT](https://choosealicense.com/licenses/mit/)

