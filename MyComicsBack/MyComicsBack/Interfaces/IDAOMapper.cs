namespace MyComicsBack.Interfaces
{
    public interface IDAOMapper <TInput, TOutput>
    {
        TOutput DAOMapping(TInput input);
    }
}
