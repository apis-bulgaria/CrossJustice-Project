﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossJustice.Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Diagnostics;

    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Case> Cases { get; set; }
        public virtual DbSet<ExpertMaterial> ExpertMaterials { get; set; }
        public virtual DbSet<CaseLog> CasesLog { get; set; }
        public virtual DbSet<ExpertMaterialsLog> ExpertMaterialsLog { get; set; }

        public virtual DbSet<ExpertDocument> ExpertDocuments { get; set; }

        public virtual DbSet<Metadata> Metadata { get; set; }
        public virtual DbSet<MetadataLog> MetadataLog { get; set; }
        public virtual DbSet<MetaFile> MetaFile { get; set; }
        public virtual DbSet<MetaTranslatedFile> MetaTranslatedFile { get; set; }
        public virtual DbSet<Codes> Codes { get; set; }
        public virtual DbSet<Language> Languages { get; set; }
        public virtual DbSet<Relationship> Relationships { get; set; }
        public virtual DbSet<Organization> Organizations { get; set; }
        public virtual DbSet<Texts> Texts { get; set; }
        public virtual DbSet<Court> Court { get; set; }
        public virtual DbSet<CourtEng> CourtEng { get; set; }

        public virtual DbSet<Keyword> Keywords { get; set; }

        public virtual DbSet<Jurisdiction> Jurisdictions { get; set; }
        public virtual DbSet<Source> Source { get; set; }
        
        public virtual DbSet<OrganizationJurisdiction> OrganizationJurisdiction { get; set; }

        public virtual DbSet<Directive> Directives { get; set; }
        public virtual DbSet<DirectiveTransposition> DirectiveTranspositions { get; set; }
        
        public virtual DbSet<DirectiveTranspositionLog> DirectiveTranspositionLogs { get; set; }
        
        public virtual DbSet<DirectiveTranspositionLock> DirectiveTranspositionLocks { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Codes>(entity =>
            {
                entity.ToTable("Codes", "classifier");

                entity.HasIndex(e => e.Code)
                    .HasName("idx_classifier_Codes_Code")
                    .IsUnique();

                entity.HasIndex(e => e.Level)
                    .HasName("idx_classifier_Codes_Level");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            builder.Entity<Court>(entity =>
            {
                entity.ToTable("Court", "suggest");

                entity.HasKey(e => new {e.Name, e.JurId});

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.HasOne(d => d.Jurisdiction)
                    .WithMany(p => p.Courts)
                    .HasForeignKey(d => d.JurId)
                    .HasConstraintName("FK_Court_Jurisdiction");
            });

            builder.Entity<Keyword>(entity =>
            {
                entity.HasKey(e => e.Name);

                entity.ToTable("Keywords", "suggest");

                entity.Property(e => e.Name)
                    .HasMaxLength(256)
                    .ValueGeneratedNever();
            });

            builder.Entity<CourtEng>(entity =>
            {
                entity.ToTable("CourtEng", "suggest");

                entity.HasKey(e => new {e.Name, e.JurId});

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.HasOne(d => d.Jurisdiction)
                    .WithMany(p => p.CourtsEng)
                    .HasForeignKey(d => d.JurId)
                    .HasConstraintName("FK_CourtEng_Jurisdiction");
            });

            
            
            builder.Entity<ExpertMaterialsLog>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ChangeDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("content");

                entity.Property(e => e.ExpertMaterialId).HasColumnName("expertMaterialId");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("userId")
                    .HasMaxLength(450);

                entity.HasOne(d => d.ExpertMaterial)
                    .WithMany(p => p.ExpertMaterialsLog)
                    .HasForeignKey(d => d.ExpertMaterialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ExpertMaterialsLog__ExpertMaterials");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ExpertMaterialsLogs)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__ExpertMaterialsLog__AspNetUsers");
            });
            
            builder.Entity<Jurisdiction>(entity =>
            {
                entity.ToTable("Jurisdictions", "suggest");

                entity.Property(e => e.JurCode)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            builder.Entity<Source>(entity =>
            {
                entity.ToTable("Source", "suggest");

                entity.HasKey(e => new {e.Name, e.JurId});

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.HasOne(d => d.Jurisdiction)
                    .WithMany(p => p.Sources)
                    .HasForeignKey(d => d.JurId)
                    .HasConstraintName("FK_Source_Jurisdiction");
            });

            builder.Entity<ApplicationUser>(entity =>
            {
                entity.Property(e => e.OrganizationId).HasMaxLength(450);
                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_Organizations_Users");
                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");
                entity.HasMany(e => e.Claims)
                    .WithOne().HasForeignKey(uc => uc.UserId)
                    .IsRequired();
            });

            builder.Entity<Case>(entity =>
            {
                entity.HasIndex(e => e.UserId)
                    .HasName("idx_userId_cases");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Caption)
                    .IsRequired()
                    .HasColumnName("caption")
                    .HasMaxLength(4000);

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("content");

                entity.Property(e => e.LastChange).HasColumnName("lastChange");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Cases)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Cases__userId__4BAC3F29");
            });
            
            builder.Entity<OrganizationJurisdiction>(entity =>
            {
                entity.HasKey(e => new { e.OrganizationId, e.JurisdictionId })
                    .HasName("PK_Org_Jurisdiction");

                entity.ToTable("Organization_Jurisdiction");

                entity.HasIndex(e => e.JurisdictionId)
                    .HasName("IX_Jurisdiction");

                entity.HasOne(d => d.Jurisdiction)
                    .WithMany(p => p.OrganizationJurisdictions)
                    .HasForeignKey(d => d.JurisdictionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Juridiction");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.OrganizationJurisdictions)
                    .HasForeignKey(d => d.OrganizationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Organization");
            });
            
            builder.Entity<ExpertMaterial>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Caption)
                    .IsRequired()
                    .HasColumnName("caption")
                    .HasMaxLength(4000);

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("((0))");
                
                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("content");

                entity.Property(e => e.LastChange).HasColumnName("lastChange");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("userId")
                    .HasMaxLength(450);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ExpertMaterials)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Users_ExpertMaterials");
            });

            builder.Entity<CaseLog>(entity =>
            {
                entity.HasIndex(e => e.CaseId)
                    .HasName("idx_caseid_caseslog");

                entity.HasIndex(e => e.UserId)
                    .HasName("idx_userId_caseslog");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CaseId).HasColumnName("caseId");

                entity.Property(e => e.ChangeDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("content");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("userId");

                entity.HasOne(d => d.Case)
                    .WithMany(p => p.CasesLog)
                    .HasForeignKey(d => d.CaseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CasesLog__caseId__59063A47");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.CasesLog)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CasesLog__userId__5812160E");
            });
            
            builder.Entity<MetaFile>(entity =>
            {
                entity.Property(e => e.Content).IsRequired();

                entity.Property(e => e.MimeType)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.Metadata)
                    .WithMany(p => p.MetaFile)
                    .HasForeignKey(d => d.MetadataId)
                    .HasConstraintName("FK_Metadata_MetaFile");
            });
            
            builder.Entity<MetaTranslatedFile>(entity =>
            {
                entity.Property(e => e.Content).IsRequired();

                entity.Property(e => e.MimeType)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.Metadata)
                    .WithMany(p => p.MetaTranslatedFile)
                    .HasForeignKey(d => d.MetadataId)
                    .HasConstraintName("FK_Metadata_MetaTranslatedFile");
            });
            
            builder.Entity<Metadata>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Caption)
                    .IsRequired()
                    .HasColumnName("caption")
                    .HasMaxLength(4000);

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("content");

                entity.Property(e => e.LastChange).HasColumnName("lastChange");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("userId")
                    .HasMaxLength(450);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Metadata)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Users_Metadata");
            });

            builder.Entity<MetadataLog>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ChangeDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("content");

                entity.Property(e => e.MetadataId).HasColumnName("metadataId");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("userId")
                    .HasMaxLength(450);

                entity.HasOne(d => d.Metadata)
                    .WithMany(p => p.MetadataLog)
                    .HasForeignKey(d => d.MetadataId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Metadata_MetadataLog");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.MetadataLog)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Users_MetadataLog");
            });
            builder.Entity<Organization>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.FullName).HasMaxLength(256);

                entity.Property(e => e.ShortName)
                    .IsRequired()
                    .HasMaxLength(256);
            });

            builder.Entity<Language>(entity =>
            {
                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.NameEn)
                    .IsRequired()
                    .HasMaxLength(50);
                
                entity.Property(e => e.ThreeLetter)
                    .IsRequired()
                    .HasMaxLength(3);

                entity.Property(e => e.TwoLetter)
                    .IsRequired()
                    .HasMaxLength(2);
            });

            builder.Entity<ExpertDocument>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Content).IsRequired();

                entity.Property(e => e.MimeType)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.ExpertMaterial)
                    .WithMany(p => p.ExpertDocuments)
                    .HasForeignKey(d => d.ExpertMaterialId)
                    .HasConstraintName("FK_ExpertDocument_ExpertMaterial");

                entity.HasOne(d => d.Language)
                    .WithMany(p => p.ExpertDocuments)
                    .HasForeignKey(d => d.LanguageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ExpertDocument_Language");
            });
            
            builder.Entity<Relationship>(entity =>
            {
                entity.HasKey(e => new {e.ParentId, e.ChildId});

                entity.ToTable("Relationships", "classifier");

                entity.HasIndex(e => e.ChildId)
                    .HasName("idx_classifier_Relationships_ChildId");

                entity.HasIndex(e => e.ParentId)
                    .HasName("idx_classifier_Relationships_ParentId");

                entity.HasOne(d => d.Child)
                    .WithMany(p => p.Parents)
                    .HasForeignKey(d => d.ChildId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_classifier_Relationships_ChildId");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.Children)
                    .HasForeignKey(d => d.ParentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_classifier_Relationships_ParentId");
            });

            builder.Entity<Texts>(entity =>
            {
                entity.ToTable("Texts", "classifier");

                entity.Property(e => e.Text).IsRequired();

                entity.HasOne(d => d.Classifier)
                    .WithMany(p => p.Texts)
                    .HasForeignKey(d => d.ClassifierId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_classifier_Texts_Codes");

                entity.HasOne(d => d.Language)
                    .WithMany(p => p.Texts)
                    .HasForeignKey(d => d.LanguageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Texts_Languages");
            });
            builder.Entity<DirectiveTranspositionLog>(entity =>
            {
                entity.HasIndex(e => e.UserId)
                    .HasName("IX_UserId");

                entity.HasIndex(e => new { e.DirectiveTranspositionCelex, e.DirectiveTranspositionCountryId })
                    .HasName("IX_DirectiveTranspositionId");

                entity.Property(e => e.ContentArchive).IsRequired();

                entity.Property(e => e.DirectiveTranspositionCelex)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.DirectiveTranspositionLogs)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DirectiveTranspositionsLog_Users");

                entity.HasOne(d => d.DirectiveTransposition)
                    .WithMany(p => p.DirectiveTranspositionLogs)
                    .HasForeignKey(d => new { d.DirectiveTranspositionCelex, d.DirectiveTranspositionCountryId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DirectiveTranspositionsLog_DirectiveTranspositions");
            });
            
            builder.Entity<DirectiveTranspositionLock>(entity =>
            {
                entity.HasKey(e => new { e.Celex, e.CountryId })
                    .HasName("PKDirTranspLocks");

                entity.Property(e => e.Celex).HasMaxLength(50);

                entity.Property(e => e.UserId).HasMaxLength(450);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.DirectiveTranspositionLocks)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FKDirTranspLocksUsers");

                entity.HasOne(d => d.DirectiveTransposition)
                    .WithOne(p => p.DirectiveTranspositionLock)
                    .HasForeignKey<DirectiveTranspositionLock>(d => new { d.Celex, d.CountryId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKDirTranspLocksDirTransp");
            });
            
            builder.Entity<Directive>(entity =>
            {
                entity.HasIndex(e => e.Celex)
                    .HasName("UC_Directives_Celex")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Caption)
                    .IsRequired()
                    .HasColumnName("caption")
                    .HasMaxLength(1000);

                entity.Property(e => e.Celex)
                    .IsRequired()
                    .HasColumnName("celex")
                    .HasMaxLength(50);

                entity.Property(e => e.Content).IsRequired();
            });
            
            builder.Entity<DirectiveTransposition>(entity =>
            {
                entity.HasKey(e => new { e.Celex, e.CountryId })
                    .HasName("PK__Directiv__E42A7C65283423F9");

                entity.Property(e => e.Celex)
                    .HasColumnName("celex")
                    .HasMaxLength(50);

                entity.Property(e => e.CountryId).HasColumnName("countryId");

                entity.Property(e => e.Content).IsRequired();
            });
        }
    }
}