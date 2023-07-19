using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Genre
    {
        public string Name {get; set;}
        public long Id { get; set; }

        public ICollection<Movie> Movies { get; set; }
    }
}
