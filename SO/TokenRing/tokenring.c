#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <string.h>
#include <time.h>
#include <sys/time.h>

void token_ring(int n, double p, int t, int max, time_t CurrentTime, int maxTime) {
    // Processo filho
    int token = 0;
    int pipes[n][2];  // Matriz para armazenar os descritores de arquivo dos pipes
    pid_t processes[n];  // Array para armazenar os IDs dos processos

    // Criar pipes
    for (int i = 0; i < n; i++)
       pipe(pipes[i]);

    // Criar processos
    for (int i = 0; i < n; i++) {
        pid_t pid = fork();
        if (pid == -1) exit(1);
        else if (pid > 0)      processes[i] = pid; // Processo pai
        else {
            srand(time(NULL) + i + 1);
            read(pipes[i][0], &token, sizeof(token));  // Receber o token do processo anterior
            int next_process = ((i + 1) % n) + 1;
            int pipe_out = pipes[next_process - 1][1];  // Extremidade de escrita para o próximo processo
            int pipe_in = pipes[i][0];  // Extremidade de leitura do processo atual

            while (token < max) {

                if (((double)rand() / RAND_MAX) < p) {
                    printf("[p%d] blocked on token (val = %d)\n", i + 1, token);
                    usleep(t * 1000000);
                }
                token++;

                int lidos =  write(pipe_out, &token, sizeof(token));  // Enviar o token para o próximo processo
                if (lidos < 0 || lidos != sizeof(token)) printf("Erro\n");
                if (token >= max) exit(0);
                int lidos1 = read(pipe_in, &token, sizeof(token));  // Receber o token do processo anterior
                if (token >= max) write(pipe_out, &token, sizeof(token));
                if (lidos1 < 0 || lidos1 != sizeof(token)) printf("Erro read\n");

                if (time(NULL) - CurrentTime > maxTime){
                    write(pipe_out, &token, sizeof(token));
                    exit(0);
                }
            }

            exit(0);  // Terminar o processo filho
        }
    }

    // Processo pai
    int initial_token = 0;
    close(pipes[0][0]);  // Fechar a extremidade de leitura do primeiro pipe
    write(pipes[0][1], &initial_token, sizeof(initial_token));  // Enviar o token inicial para o primeiro processo
    close(pipes[0][1]);  // Fechar a extremidade de escrita do primeiro pipe

    // Esperar pela finalização dos processos filhos
    for (int i = 0; i < n; i++) {
        waitpid(processes[i], NULL, 0);
    }
}

int main(int argc, char* argv[]) {
    int n = atoi(argv[1]);  // Número total de processos
    double p = atof(argv[2]);  // Probabilidade de bloqueio
    int t = atoi(argv[3]);  // Tempo de bloqueio em segundos
    int max = atoi(argv[4]);  // Valor máximo para terminar o sistema
    int tempo = atoi(argv[5]);

    token_ring(n, p, t, max, time(NULL), tempo);

    return 0;
}