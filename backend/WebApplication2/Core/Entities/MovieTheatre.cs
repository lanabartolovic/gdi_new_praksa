using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    public class MovieTheatre
    {
        public long Id { get; set; }
        public string Name { get; set; }
        //jos fali adresa al poslije
        public double Long { get; set; }
        public double Lat { get; set; }
    }
}
