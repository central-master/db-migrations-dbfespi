### Pré-Requisitos na criação do projeto

## No Google Cloud
- Ter uma conta de serviço que:
  - Ter o papel de 'Desenvolvedor de Cloud Functions'.
  - Ter uma chave (json) de acesso.
- Liberar no firewall da VM os IPs do Cloud Functions para que o mesmo tenha acesso ao banco de dados.
- Criar na raiz da aplicação o arquivo .gcloudignore e definir os arquivos que não entram no deploy.
- Ter o código da aplicação concluída.
- Criar a Function via SDK Cloud.
  Nota: No script de criação da function, definir os valores das variáveis de ambiente.
  - Script utilizado na criação da Function:
     gcloud functions deploy
       db-migrations-dbfespi
       --entry-point runMigrations
       --runtime nodejs10
       --trigger-http
       --region us-central1
       --allow-unauthenticated
       --set-env-vars DB_HOST=xxx,DB_PORT=xxx,DB_USERNAME=xxx,DB_PASSWORD=xxx,DB_DATABASE=xxx 

## No GitHub
- Ter realizado o push do código da aplicação no repositório.
- Criar as Secrets:
  - GCP_PROJECT_ID=****
  - GCP_SA_KEY=[chave de acesso (json) da conta de serviço criada no google cloud]
- Criar o workflow de deploy na Actions.
