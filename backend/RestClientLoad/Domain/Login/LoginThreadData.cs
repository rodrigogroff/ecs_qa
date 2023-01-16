using RestSharp;
using System;
using System.Diagnostics;
using System.Net;

namespace IntegrationLoad.Domain.Auth;

public class LoginThreadData : MainLoaderThreadData
{
    public override MainLoaderThreadData NewInstance(string seed)
    {
        return new LoginThreadData
        {
            baseUri = baseUri,
            indexer = seed,
        };
    }

    public string baseEmail = "";

    public long id_company = 0;
    public long id_user = 0;
    
    public override void BuildScenary()
    {
        #region - code - 

        milis = 0;
        baseEmail = "test@test.com.br" + indexer;

        var dest = baseUri + @"/api/portal/register";
        var client = new RestClient(dest);
        var request = new RestRequest();
        request.AddHeader("Content-Type", "application/json");
        request.RequestFormat = DataFormat.Json;
        request.Method = Method.Post;

        request.AddBody(new { company = "test" + indexer, email = baseEmail, password = "123456"});
        var response = client.Execute(request);

        #endregion
    }

    public override void Run()
    {
        #region - code - 

        var stopWatch = new Stopwatch();

        var expectedResult = (int)HttpStatusCode.OK;
        stopWatch.Start();

        var dest = baseUri + @"/api/portal/authenticate";
        var client = new RestClient(dest);
        var request = new RestRequest();
        request.AddHeader("Content-Type", "application/json");            
        request.RequestFormat = DataFormat.Json;
        request.Method = Method.Post;

        request.AddBody(new { email = baseEmail, password = "123456"});
        var response = client.Execute(request);
        if ((int)response.StatusCode != expectedResult)
            Console.WriteLine(response.Content.ToString()); 

        stopWatch.Stop();
        milis = (int)stopWatch.ElapsedMilliseconds;

        #endregion
    }

    public override void Clean()
    {
        #region - code - 

        #endregion
    }
}
