using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class FirstProjection
    {
        public string MovieName { get; set; }
        public string MovieTheatreName { get; set; }
        public long MovieTheatreId { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
    }
}
