
## Integration load - criar teste de stress

Passo a passo:

1. identificar dominio do teste (ex: login)
2. ir na pasta "Domain" e  verificar se já não existe a pasta "Login"
3. criar arquivo "<Login>ThreadData.cs"
4. Usar template inicial abaixo (substituir "<Login>" pelo nome de seu teste): 

using RestSharp;
using System;
using System.Diagnostics;
using System.Net;

namespace IntegrationLoad.Domain.<Login>;

public class <Login>ThreadData : MainLoaderThreadData
{
    public override MainLoaderThreadData NewInstance(string seed)
    {
        return new <Login>ThreadData
        {
            baseUri = baseUri,
            indexer = seed,
        };
    }
    
    public override void BuildScenary()
    {
    }

    public override void Run()
    {
        var stopWatch = new Stopwatch();
        stopWatch.Start();

        // code here

        stopWatch.Stop();
        milis = (int)stopWatch.ElapsedMilliseconds;
    }

    public override void Clean()
    {
    }
}
