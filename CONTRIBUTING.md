[comment]: # ' Copyright Contributors to the Open Cluster Management project '

# Contributing to react-data-view

All contributions to the repository must be submitted under the terms of the [Apache Public License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Contributing A Patch

1. Submit an issue describing your proposed change to the repo in question.
1. Fork the desired repo, develop and test your code changes.
1. Ensure all commits include a `Signed-off-by` trailer (use `git commit -s`).
1. Submit a pull request.

## Issue and Pull Request Management

Anyone may comment on issues and submit reviews for pull requests. However, in
order to be assigned an issue or pull request, you must be a member of the
[stolostron](https://github.com/stolostron) GitHub organization.

Repo maintainers can assign you an issue or pull request by leaving a
`/assign <your Github ID>` comment on the issue or pull request.

## Pre-check before submitting a PR

After your PR is ready to commit, please run following commands to check your code:

```bash
npm test
npm run prettier:fix
```

### Testing your change

Start local demo server:

```bash
npm ci
npm start
```

Access the demo at **http://localhost:3000**
