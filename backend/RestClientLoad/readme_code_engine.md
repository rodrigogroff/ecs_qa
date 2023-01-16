
## Integration load - IntegrationLoadMaster

-classe que dispara todos os tipos de testes, escolhidos pelo usuário ao rodar


## Integration load - engine "MainLoader"

-responsável pela execução de testes, e escolha dos modos de stress
-aceita classe criada pelo usuário, e anexada em "IntegrationLoadMaster"
-ignorar esta classe se não for dev técnico


## Integration load - domain

-diretório de testes de stress, separados por dominio
-classe principal a ser derivada é "MainLoaderThreadData"


