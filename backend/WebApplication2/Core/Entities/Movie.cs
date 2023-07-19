using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Movie
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long DurationMinutes { get; set; }
        public DateTime DatumIzlaska { get; set; }
        public long GenreId { get; set; }
        public Genre Genre { get; set; }

    }
}
