using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int Id { get; set; }
    
    [Required(ErrorMessage="Name is required")]
    [StringLength(50,ErrorMessage="Max 50 characters")]
    public string Name { get; set; }
    
    [Required(ErrorMessage="Age is required")]
    [Range(0, 120, ErrorMessage="Age must be greater than or equal 0")]
    public int Age { get; set; }

    [Required(ErrorMessage="Address is required")]
    [StringLength(50,ErrorMessage="Max 50 characters")]
    public string Address { get; set; }
}