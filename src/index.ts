import fs from 'fs';
import { jira } from './bootstrap';
import cliProgress from 'cli-progress';

const findAll = async function() {
    let lastChunk = 0;
    const chunkSize = 500;

    const maxResults = 50;
    let startAt = 0;

    const { total, issues } = await findChunk(startAt, maxResults);
    let allIssues = issues;

    const chunks = Math.ceil(total / maxResults);

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    let index = 1;
    progressBar.start(chunks, index);
    
    while (index < chunks) {
        progressBar.increment();
        index += 1;
        startAt += maxResults;

        const { issues } = await findChunk(startAt, maxResults);
        allIssues = [...allIssues, ...issues];

        if (allIssues.length >= chunkSize) {
            await writeFile(lastChunk, startAt + issues.length, allIssues);
            lastChunk = startAt + issues.length;
            allIssues = [];
        }
    }

    progressBar.stop();
    await writeFile(lastChunk, total, allIssues);
}

const findChunk = async function(startAt: number = 0, maxResults: number = 50): Promise<any> {
    const response = await jira.searchJira('', {
        startAt,
        maxResults
    });

    return {
        total: response.total,
        issues: response.issues
    };
}

const writeFile = function(from: number, to: number, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.writeFile(`output/issues.${from}-${to}.json`, JSON.stringify(data), 'utf8', err => {
            if (err) {
                return reject(err);
            }

            return resolve(true);
        });
    });
}

findAll().then(() => {
    console.log('Done.');
});
