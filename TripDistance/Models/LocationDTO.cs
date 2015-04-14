using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TripDistance.Models
{
    public class LocationNameDTO
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }

    public class LocationCoordsDTO
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}