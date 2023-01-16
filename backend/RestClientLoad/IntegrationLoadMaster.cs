using IntegrationLoad.Domain.Auth;
using IntegrationLoad.Engine;
using System;
using System.IO;

namespace IntegrationLoad;

internal class Testing
{
    static void Main(string[] args)
    {
        try
        {
            new IntegrationLoadMaster().MainSelector();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            Console.ReadLine();
        }
    }
}
    
public class IntegrationLoadMaster
{
    public void MainSelector()
    {
        var config = File.ReadAllText("IntegrationLoad.ini").Replace ("\r\n", "¨").Split ("¨");

        string baseUri = config[0].Split('|')[1].Trim();
        
        Console.WriteLine("baseUri       --> " + baseUri);
        
        while (true)
        {
            Console.WriteLine();
            Console.WriteLine("######################################################");
            Console.WriteLine("Stress tester");
            Console.WriteLine("######################################################");
            Console.WriteLine("[login] Login");
            Console.WriteLine("............... [x] quit ");
            var domain = Console.ReadLine();
            bool stop = false;
            switch (domain)
            {
                case "1": 
                    new MainLoader().
                        Exec(
                            new LoginThreadData
                            {
                                baseUri = baseUri,
                            }); 
                    break;

                case "x": stop = true; break;
            }

            if (stop)
                break;
        }
    }        
}
