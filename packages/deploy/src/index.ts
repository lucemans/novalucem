import express, { Request, Response } from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 8080;

app.use(express.json())

const hardcoded = {
    'novalucem/auth': 'nl-auth',
    'novalucem/deploy': 'nl-deploy',
    'novalucem/cloud': 'nl-cloud',
    'novalucem/alpine': '-',
    'novalucem/backend': 'nl-backend'
};

app.get('/', (req: Request, res: Response) => {
    res.send('AUTH OK');
});

async function updateDeployment(ns, repo_id, repo_full_name, tag) {
    await exec('kubectl set image -n ' + ns + ' --record deployment/' + repo_id + ' ' + repo_id + '=r.lvk.sh/' + repo_full_name + ':' + tag, (err, stdout, stderr) => {
        console.log('stdout');
        console.log(stdout);
        console.log('err');
        console.log(err);
        console.log('stderr');
        console.log(stderr);
        console.log('--');//d
    });
    await exec('kubectl patch deployment -n ' + ns + ' ' + repo_id + ' -p ' + "\"{\\\"spec\\\":{\\\"template\\\":{\\\"metadata\\\":{\\\"labels\\\":{\\\"date\\\":\\\"`date +'%s'`\\\"}}}}}\"", (err, stdout, stderr) => {
        console.log('stdout');
        console.log(stdout);
        console.log('err');
        console.log(err);
        console.log('stderr');
        console.log(stderr);
        console.log('--');//ddsssdds
    });
}

app.post('/callback', async (req: Request, res: Response) => {
    console.log('1');
    console.log(req.body);
    res.send('DEPLOY OK2');

    if (req.body['type']) {
        if (req.body['type'] == 'PUSH_ARTIFACT') {
            const repo_full_name: string = req.body['event_data']['repository']['repo_full_name'].toString();
            const tag: string = req.body['event_data']['resources'][0]['tag'].toString();
            let repo_id = repo_full_name.split('/').join('-')
            let ns = 'novalucem';
            let isHardcoded = false;
            if (hardcoded[repo_full_name]) {
                console.log('HARDCODED');
                repo_id = hardcoded[repo_full_name];
                ns = 'lvksh';
                isHardcoded = true;
            }
            if (!isHardcoded) {
                // Perform check if we need to make this repo--
                const res = await exec('kubectl get deployment -n novalucem');
                const f = await res.stdout.setEncoding('utf-8');
                let rf = '';
                res.stdout.on('data', (r) => {
                    rf = rf + r;
                });
                res.stdout.on('close', async () => {
                    console.log(rf);
                    console.log('close');
                    const result = rf.match(repo_id + " ");
                    if (result != null && result.length > 0) {
                        console.log('UPDATING PLEB IMAGE');
                        updateDeployment(ns, repo_id, repo_full_name, tag);
                    } else {
                        console.log('DEPLOY');
                        console.log(path.join(__dirname, '/../template/template.yaml'));
                        fs.readFile(path.join(__dirname, '/../template/template.yaml'), (err, buffer) => {
                            let template = buffer.toString();
                            template = template.replace(/\{name\}/g, repo_id);
                            template = template.replace(/\{ns\}/g, ns);
                            template = template.replace(/\{img\}/g, repo_full_name);
                            template = template.replace(/\{tag\}/g, tag);
                            fs.writeFile(path.join(__dirname, '/../template/' + repo_id + '.yaml'), template, async () => {
                                await exec('kubectl apply -f ' + path.join(__dirname, '/../template/' + repo_id + '.yaml') + ' -n ' + ns, (err, stdout, stderr) => {
                                    console.log('stdout');
                                    console.log(stdout);
                                    console.log('err');
                                    console.log(err);
                                    console.log('stderr');
                                    console.log(stderr);
                                    console.log('--');//d
                                });
                            });
                        });
                        // await exec('kubectl set image -n ' + ns + ' --record deployment/' + repo_id + ' ' + repo_id + '=r.lvk.sh/' + repo_full_name + ':' + tag, (err, stdout, stderr) => {
                        //     console.log('stdout');
                        //     console.log(stdout);
                        //     console.log('err');
                        //     console.log(err);
                        //     console.log('stderr');
                        //     console.log(stderr);
                        //     console.log('--');//d
                        // });
                    }
                })
                return;
            }

            if (hardcoded[repo_full_name] != '-') { // Do not build Alpine Image!
                console.log('SYS UPGRADE');
                await updateDeployment(ns, repo_id, repo_full_name, tag);
            }
        }
    }
});
app.post('/callback2', (req: Request, res: Response) => {
    console.log('2');
    console.log(req.body);
    res.send('DEPLOY OK3');

    if (req.body['type']) {
        // if (req.body['type'] == 'PUSH_ARTIFACT') {
        //     const repo_full_name = req.body['event_data']['repository']['repo_full_name'];
        //     console.log(repo_full_name);
        //     console.log(JSON.stringify(req.body['event_data']['resources']));
        // }
    }
});
//dsarsaasdsssdsd
app.listen(port, () => {
    console.log('ONLINE');
});