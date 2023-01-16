
## Integration load - anexar teste

Para acrescentar um novo teste de stress:

1. Ajustar a classe "IntegrationLoadMaster" no método "MainSelector()"
2. Ajustar código abaixo:

            // inserir
            Console.WriteLine("[login] <Login>");                

            Console.WriteLine("............... [x] quit ");

            var domain = Console.ReadLine();
            bool stop = false;
            switch (domain)
            {
                // inserir
                case "login": 
                    new MainLoader().
                        Exec(
                            new <Login>ThreadData
                            {
                                baseUri = baseUri,
                            }); 
                    break;
