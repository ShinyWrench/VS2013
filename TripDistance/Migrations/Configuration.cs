namespace TripDistance.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using TripDistance.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<TripDistance.Models.TripDistanceContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(TripDistance.Models.TripDistanceContext context)
        {
            context.Locations.AddOrUpdate(x => x.Id,
                new Location() { Id = 1, ZipCode = 02029, City = "Providence", State = "RI", Latitude = 41.817398D, Longitude = -71.453674D },
                new Location() { Id = 2, ZipCode = 14604, City = "Rochester", State = "NY", Latitude = 43.156963D, Longitude = -77.60375D },
                new Location() { Id = 3, ZipCode = 02101, City = "Boston", State = "MA", Latitude = 42.370567D, Longitude = -71.026964D },
                new Location() { Id = 4, ZipCode = 04330, City = "Augusta", State = "ME", Latitude = 44.344406D, Longitude = -69.76345D },
                new Location() { Id = 5, ZipCode = 10001, City = "New York", State = "NY", Latitude = 40.750742D, Longitude = -73.99653D },
                new Location() { Id = 6, ZipCode = 12601, City = "Poughkeepsie", State = "NY", Latitude = 41.701443D, Longitude = -73.91922D },
                new Location() { Id = 7, ZipCode = 13201, City = "Syracuse", State = "NY", Latitude = 43.02143D, Longitude = -76.197701D },
                new Location() { Id = 8, ZipCode = 13501, City = "Utica", State = "NY", Latitude = 43.087669D, Longitude = -75.22681D },
                new Location() { Id = 9, ZipCode = 14201, City = "Buffalo", State = "NY", Latitude = 42.896407D, Longitude = -78.88515D },
                new Location() { Id = 10, ZipCode = 14830, City = "Corning", State = "NY", Latitude = 42.140881D, Longitude = -77.04793D },
                new Location() { Id = 11, ZipCode = 14850, City = "Ithaca", State = "NY", Latitude = 42.449454D, Longitude = -76.49685D },
                new Location() { Id = 12, ZipCode = 15201, City = "Pittsburgh", State = "PA", Latitude = 40.471468D, Longitude = -79.95726D },
                new Location() { Id = 13, ZipCode = 21201, City = "Baltimore", State = "MD", Latitude = 39.295306D, Longitude = -76.62118D },
                new Location() { Id = 14, ZipCode = 21401, City = "Annapolis", State = "MD", Latitude = 38.997511D, Longitude = -76.49803D },
                new Location() { Id = 15, ZipCode = 39530, City = "Biloxi", State = "MS", Latitude = 30.399148D, Longitude = -88.88917D },
                new Location() { Id = 16, ZipCode = 50301, City = "Des Moines", State = "IA", Latitude = 41.672687D, Longitude = -93.572173D },
                new Location() { Id = 17, ZipCode = 60601, City = "Chicago", State = "IL", Latitude = 41.886456D, Longitude = -87.62325D },
                new Location() { Id = 18, ZipCode = 70112, City = "New Orleans", State = "LA", Latitude = 29.956804D, Longitude = -90.07757D },
                new Location() { Id = 19, ZipCode = 80509, City = "Colorado Springs", State = "CO", Latitude = 38.828692D, Longitude = -104.84063D },
                new Location() { Id = 20, ZipCode = 83701, City = "Boise", State = "ID", Latitude = 43.603768D, Longitude = -116.272921D },
                new Location() { Id = 21, ZipCode = 86001, City = "Flagstaff", State = "AZ", Latitude = 35.279872D, Longitude = -111.72256D },
                new Location() { Id = 22, ZipCode = 90001, City = "Los Angeles", State = "CA", Latitude = 33.972914D, Longitude = -118.24878D },
                new Location() { Id = 23, ZipCode = 94101, City = "San Francisco", State = "CA", Latitude = 37.784827D, Longitude = -122.727802D },
                new Location() { Id = 24, ZipCode = 98060, City = "Seattle", State = "WA", Latitude = 47.432251D, Longitude = -121.803388D }
            );
        }
    }
}
