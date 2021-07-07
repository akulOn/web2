using System;
using System.Collections.Generic;

namespace WebApplication1.Models.Helpers
{
    public class Chart
    {
        public string name { get; set; }
        public List<ChartData> series { get; set; }
    }
}