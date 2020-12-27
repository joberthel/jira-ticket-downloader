import dotenv from 'dotenv';
import JiraApi from 'jira-client';

dotenv.config();

export const jira = new JiraApi({
    protocol: process.env.JIRA_PROTOCOL,
    host: process.env.JIRA_HOST,
    username: process.env.JIRA_USERNAME,
    password: process.env.JIRA_PASSWORD,
    apiVersion: process.env.JIRA_API_VERSION,
    strictSSL: true
});
