# jira-ticket-downloader

Will create multiple `issues.{n}-{n+1}json` files inside the `output` directory containing all issues from jira.

1. Install all dependencies

```
$ npm i
```

2. Create an `.env` file with the credentials in the root directory

```
JIRA_PROTOCOL=https
JIRA_HOST=example.atlassian.net
JIRA_USERNAME=foo
JIRA_PASSWORD=bar
JIRA_API_VERSION=2
```

3. Run the script

```
$ npm start
```
