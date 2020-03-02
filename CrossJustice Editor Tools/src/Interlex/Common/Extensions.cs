using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossJustice.Common
{
    public static class Extensions
    {
        public static bool IsNotNull(this string str)
        {
            return !string.IsNullOrEmpty(str);
        }
    }
}
