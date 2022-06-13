
namespace AspNetCoreWithReact.Model.Entities
{
    public interface ILibraryService
    {
        void Delete(Library prLibrary);
        List<Library> GetAll();
        List<Library> GetByName(string prName);
        Library Save(Library prLibrary);
        Library Update(Library prLibrary);
    }
}