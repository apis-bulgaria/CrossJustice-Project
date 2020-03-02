using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CrossJustice.Models.RequestModels
{
    public class UserChangeStateModel
    {
        [Required]
        public string Username { get; set; }
    }
}
