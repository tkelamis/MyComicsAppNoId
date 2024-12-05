using System.ComponentModel.DataAnnotations;

namespace MyComicsBack.Models
{
    public class Comic
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MinLength(1, ErrorMessage = "Title must have at least 1 character")]
        public string Title { get; set; }

        public int Pages { get; set; }
    }
}
