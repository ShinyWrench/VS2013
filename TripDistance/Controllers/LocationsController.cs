using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TripDistance.Models;

namespace TripDistance.Controllers
{
    public class LocationsController : ApiController
    {
        private TripDistanceContext db = new TripDistanceContext();

        // GET: api/Locations
        public IQueryable<LocationNameDTO> GetLocations()
        {
            var locations = from loc in db.Locations
                            select new LocationNameDTO
                            {
                                Id = loc.Id,
                                City = loc.City,
                                State = loc.State
                            };

            return locations;
        }

        // GET: api/Locations/5
        [ResponseType(typeof(LocationCoordsDTO))]
        public IHttpActionResult GetLocation(int id)
        {
            var location = db.Locations.Select(loc =>
                new LocationCoordsDTO()
                {
                    Id = loc.Id,
                    Latitude = loc.Latitude,
                    Longitude = loc.Longitude
                }
            ).SingleOrDefault(loc => loc.Id == id);

            if (location == null)
            {
                return NotFound();
            }

            return Ok(location);
        }
    }
}