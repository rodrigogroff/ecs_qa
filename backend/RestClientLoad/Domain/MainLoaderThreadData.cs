namespace IntegrationLoad.Domain;

public class MainLoaderThreadData
{
    public int milis = 0;
    public string indexer = "";
    public string baseUri = "";

    public virtual void BuildScenary() { }
    public virtual void Run() { }
    public virtual void Clean() { }

    public virtual MainLoaderThreadData NewInstance(string seed)
    {
        return null;
    }
}
