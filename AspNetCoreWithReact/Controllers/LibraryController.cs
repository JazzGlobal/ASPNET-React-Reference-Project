using AspNetCoreWithReact.Model.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreWithReact.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly ILibraryService _ILibraryService;
        public LibraryController(ILibraryService prLibraryService)
        {
            _ILibraryService = prLibraryService;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            List<Library> lResult = _ILibraryService.GetAll();
            return Ok(lResult);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="prName">Name for which compare is performed to return Library object.</param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Search(string prName)
        {
            List<Library> lResult = _ILibraryService.GetByName(prName);
            return Ok(lResult);
        }
        [HttpPut]
        public IActionResult Update(Library prLibrary)
        {
            return Ok(_ILibraryService.Update(prLibrary));
        }
        [HttpPost]
        public IActionResult Save(Library prLibrary)
        {
            return Ok(_ILibraryService.Save(prLibrary));
        }
        [HttpDelete]
        public IActionResult Delete(Library prLibrary)
        {
            _ILibraryService.Delete(prLibrary);
            return Ok();
        }
    }
}
