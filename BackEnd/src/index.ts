import os from 'os';
import cluster from 'cluster'; 

// Gerenciar os processos para fazer o balanceamento de carga, assim melhorando performance.
const runPrimaryProcess = () => {
    const processCount : number = os.cpus().length; // Quantidade de nucleos CPUs, utilize x 2 em ambientes mais caoticos.
    console.log(`Primary: ${process.pid}. Forking Server with ${processCount} processes CPUs.`);

    for(let index: number = 0; index < processCount; index ++)
        cluster.fork();

    cluster.on('exit', (worker, code, signal) => {
        if(code !== 0 && !worker.exitedAfterDisconnect)
            cluster.fork();
    })
}

const runWorketProcess = async () => {
    await import('./server');
}

cluster.isPrimary ? runPrimaryProcess() : runWorketProcess();