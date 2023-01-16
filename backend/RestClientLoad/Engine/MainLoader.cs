using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using IntegrationLoad.Domain;

namespace IntegrationLoad.Engine;

public class MainLoader
{
    public string resultsFile = "results.csv";

    public bool Process(
        int iteration, 
        List<MainLoaderThreadData> listTaskData, 
        MainLoaderThreadData baseData,
        string base_seed, 
        Task[] listTask, 
        ref int maxTries,
        ref int lastLoad,
        int? repeats)
    {
        #region - code - 

        for (int i = 0; i < iteration; i++)
            listTaskData.Add(
                baseData.NewInstance(base_seed + iteration));

        for (int i = 0; i < iteration;) { var t_data = listTaskData[i]; listTask[i] = Task.Run(() => t_data.BuildScenary()); i++; }
        Task.WaitAll(listTask);

        for (int i = 0; i < iteration;) { var t_data = listTaskData[i]; listTask[i] = Task.Run(() => t_data.Run()); i++; }
        Task.WaitAll(listTask);

        for (int i = 0; i < iteration;) { var t_data = listTaskData[i]; listTask[i] = Task.Run(() => t_data.Clean()); i++; }
        Task.WaitAll(listTask);

        #region - code - 

        if (iteration == 0)
            return true;

        var total_time = 0;
        var top = 0;
        var min = 9999999;

        for (int i = 0; i < iteration; i++)
        {
            var m = listTaskData[i].milis;
            total_time += m;
            if (m > top) top = m;
            if (m < min) min = m;
        }

        int currentAvg = total_time / iteration;

        if (lastLoad > 0)
        {
            if (currentAvg > lastLoad * 2)
            {
                if (maxTries-- > 0)
                {
                    iteration--;
                    return false;
                }
                else
                {
                    maxTries = 20;
                }
            }
        }
        else
        {
            lastLoad = currentAvg;
        }

        #endregion

        var _a = iteration.ToString().PadLeft(3, ' ');
        var _b = top.ToString().PadLeft(6, ' ');
        var _c = min.ToString().PadLeft(6, ' ');
        var _d = (total_time / iteration).ToString().PadLeft(6, ' ');

        Console.WriteLine("Users >> " + _a + " << -- MAX " + _b +
            "ms MIN " + _c +
            "ms AVG " + _d + " " + (repeats != null ? " R[" + repeats + "]" : ""));

        File.AppendAllText(resultsFile, _a + ";" + _b + ";" + _c + ";" + _d + ";\r\n");

        return true;

        #endregion
    }

    public void Exec(MainLoaderThreadData baseData)
    {
        string pref_users = "",
                pref_repeats = "";

        if (File.Exists(resultsFile))
            File.Delete(resultsFile);

        File.AppendAllText(resultsFile, "USERS;MAX;MIN;AVG;\r\n");

        while (true)
        {
            int maxTries = 20;
            int lastLoad = 0;

            string base_seed = DateTime.Now.ToString("yyyyMMddHHmm");

            Console.WriteLine();
            Console.WriteLine("---- ramp up load? [y] [n]");

            var sl = Console.ReadLine();

            if (sl == "n")
            {
                Console.WriteLine("Concurrent Users? [10]");

                #region - code - 

                string conc_users = Console.ReadLine();
                if (conc_users == "x") break;

                if (string.IsNullOrEmpty(conc_users))
                {
                    if (pref_users != "") conc_users = pref_users; else conc_users = "10";
                    if (pref_users == "") pref_users = conc_users;
                    Console.WriteLine("[" + conc_users + "]");
                }
                else
                    pref_users = conc_users;

                var t_max = Convert.ToInt32(conc_users);

                #endregion

                Console.WriteLine("Repeats? [10]");

                #region - code - 

                var repeats = Console.ReadLine();
                if (repeats == "x") break;

                if (string.IsNullOrEmpty(repeats))
                {
                    if (pref_repeats != "") repeats = pref_repeats; else repeats = "10";
                    if (pref_repeats == "") pref_repeats = repeats;
                    Console.WriteLine("[" + repeats + "]");
                }
                else
                    pref_repeats = repeats;

                var t_repeats = Convert.ToInt32(repeats);

                #endregion

                var iteration = t_max;

                while (t_repeats-- > 0)
                {
                    var listTask = new Task[iteration];
                    var listTaskData = new List<MainLoaderThreadData>();

                    while (!Process(iteration, listTaskData, baseData, base_seed, listTask, ref maxTries, ref lastLoad, t_repeats));
                }
            }
            else // ramp load
            {
                Console.WriteLine("Max concurrent Users? [10]");

                #region - code - 

                var conc_users = Console.ReadLine();
                if (conc_users == "x") break;

                if (string.IsNullOrEmpty(conc_users))
                {
                    if (pref_users != "") conc_users = pref_users; else conc_users = "10";
                    if (pref_users == "") pref_users = conc_users;
                    Console.WriteLine("[" + conc_users + "]");
                }
                else
                    pref_users = conc_users;

                var t_max = Convert.ToInt32(conc_users);

                #endregion

                for (int iteration = 0; iteration <= t_max; iteration++)
                {
                    var listTask = new Task[iteration];
                    var listTaskData = new List<MainLoaderThreadData>();

                    while (!Process(iteration, listTaskData, baseData, base_seed, listTask, ref maxTries, ref lastLoad, null)) ;
                }
            }
        }
    }
}
