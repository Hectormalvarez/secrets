# secrets app - for sharing one time secrets

This project is meant to make sharing private information _such as passwords, account numbers, etc._ easier for everybody

anyone will be able to store a secret in the cloud that is protected by aes-256 encryption at rest as well as SSL encryption during transmition

there will also be a function to share secrets without a password (not secure)

project todo list

- [X] share one time open secrets
- [X] add expiration dates to secrest and notify users
- [X] allow users to customize expiration
- [ ] add password protection option to secrets
- [ ] add user login function so users can store secrets
- [ ] add sharing function so users can share stored secrets

to run development server

```
yarn dev
```

production website:
[secrets.taylormadetech.net](https://secrets.taylormadetech.net)

development website:
[dev-secrets.taylormadetech.net](https://dev-secrets.taylormadetech.net)
