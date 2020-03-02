using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CrossJustice.Models.Directive
{
    public class SmeDoc
    {
        public SmeDocMeta Meta { get; set; }
        public List<SmeDocItem> Items { get; set; }
        public string Head { get; set; }
        public SmeDocItem GetItemById(string id, bool tryParents = false)
        {
            var flattenItems = Flatten(this.Items);
            var res = flattenItems.FirstOrDefault(x => x.Id.ToLower() == id.ToLower());
            if (res == null && tryParents)
            {
                var parts = id.Split(new string[] { "__" }, StringSplitOptions.RemoveEmptyEntries);
                int cnt = parts.Length;
                while(cnt > 1)
                {
                    cnt--;
                    var artId = string.Join("__", parts.Take(cnt)).ToLower();
                    res = flattenItems.FirstOrDefault(x => x.Id.ToLower() == artId);
                    if (res != null)
                    {
                        return res;
                    }
                }
            }
            return res;
        }

        public static IEnumerable<SmeDocItem> Flatten(IEnumerable<SmeDocItem> docItems)
        {
            if (docItems == null || docItems.Count() == 0) return new List<SmeDocItem>();

            var result = new List<SmeDocItem>();
            var q = new Queue<SmeDocItem>(collection: docItems);

            while (q.Count > 0)
            {
                var item = q.Dequeue();
                result.Add(item);

                if (item?.Childs?.Count > 0)
                    foreach (var child in item.Childs)
                        q.Enqueue(child);
            }

            return result;
        }

        public bool HasRecitals() 
        {
            return this.Items?.Any(x => x.Type == SmeDocItemType.Recital) == true;
        }

    }
}
