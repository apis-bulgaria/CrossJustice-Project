﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossJustice.Data
{
    using Microsoft.AspNetCore.Identity;

    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            this.Cases = new HashSet<Case>();
            this.CasesLog = new HashSet<CaseLog>();
            this.Metadata = new HashSet<Metadata>();
            this.MetadataLog = new HashSet<MetadataLog>();
            this.ExpertMaterials = new HashSet<ExpertMaterial>();
            this.ExpertMaterialsLogs = new HashSet<ExpertMaterialsLog>();
            this.DirectiveTranspositionLogs = new HashSet<DirectiveTranspositionLog>();
            this.DirectiveTranspositionLocks = new HashSet<DirectiveTranspositionLock>();
        }

        public ApplicationUser(string userName) : base(userName)
        {
        }

        public ICollection<Case> Cases { get; set; }
        public ICollection<ExpertMaterial> ExpertMaterials { get; set; }
        public ICollection<Metadata> Metadata { get; set; }
        public ICollection<CaseLog> CasesLog { get; set; }
        public ICollection<ExpertMaterialsLog> ExpertMaterialsLogs { get; set; }
        public ICollection<MetadataLog> MetadataLog { get; set; }

        public ICollection<IdentityUserClaim<string>> Claims { get; set; }

        public string OrganizationId { get; set; }

        public Organization Organization { get; set; }
        
        public virtual ICollection<DirectiveTranspositionLog> DirectiveTranspositionLogs { get; set; }
        
        public virtual ICollection<DirectiveTranspositionLock> DirectiveTranspositionLocks { get; set; }



        public bool? IsActive { get; set; }
    }
}