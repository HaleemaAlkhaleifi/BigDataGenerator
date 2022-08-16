using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BigDataGenerator.Pages
{
    public class FormatterModel : PageModel
    {
        #region "Properties"
        public string InputData { get; set; }
        #endregion

        public FormatterModel()
        {
            InputData = string.Empty;
        }

        public void OnGet()
        {
        }
    }
}