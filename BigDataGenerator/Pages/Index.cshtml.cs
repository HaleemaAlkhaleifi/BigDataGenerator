using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BigDataGenerator.Pages
{
    public class IndexModel : PageModel
    {
        #region "Properties"
        public string FetchedData { get; set; }
        #endregion

        public IndexModel()
        {
            FetchedData = string.Empty;
        }

        public void OnGet()
        {
        }
    }
}