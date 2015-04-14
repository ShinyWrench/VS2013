using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TripDistance.Models
{
    public class Location
    {
        public int Id { get; set; }
        [Required]
        public int ZipCode { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}