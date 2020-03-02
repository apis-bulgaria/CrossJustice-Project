using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossJustice.Exceptions
{
    public class UserCreationFailedException : Exception
    {
        public UserCreationFailedException(string message) : base(message)
        {
        }

        public UserCreationFailedException(string message, Exception innerException) : base(message, innerException)
        {
        }

        public UserCreationFailedException()
        {
        }
    }
}
