﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GiftChoice.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class GiftChoiceEntities : DbContext
    {
        public GiftChoiceEntities()
            : base("name=GiftChoiceEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AdminTbl> AdminTbls { get; set; }
        public virtual DbSet<BannerCateProductTbl> BannerCateProductTbls { get; set; }
        public virtual DbSet<BannerCateTbl> BannerCateTbls { get; set; }
        public virtual DbSet<BannerProductImage> BannerProductImages { get; set; }
        public virtual DbSet<BannerProductTbl> BannerProductTbls { get; set; }
        public virtual DbSet<BannerTbl> BannerTbls { get; set; }
        public virtual DbSet<BCKeywordTbl> BCKeywordTbls { get; set; }
        public virtual DbSet<BPKeywordTbl> BPKeywordTbls { get; set; }
        public virtual DbSet<BPSizeTbl> BPSizeTbls { get; set; }
        public virtual DbSet<BPTKeywordTbl> BPTKeywordTbls { get; set; }
        public virtual DbSet<BSubKTbl> BSubKTbls { get; set; }
        public virtual DbSet<BSubTitleTbl> BSubTitleTbls { get; set; }
        public virtual DbSet<KeywordTbl> KeywordTbls { get; set; }
        public virtual DbSet<MainCateTbl> MainCateTbls { get; set; }
        public virtual DbSet<MCKeywordTbl> MCKeywordTbls { get; set; }
        public virtual DbSet<OrderMainTbl> OrderMainTbls { get; set; }
        public virtual DbSet<OrderTbl> OrderTbls { get; set; }
        public virtual DbSet<PKeywordTbl> PKeywordTbls { get; set; }
        public virtual DbSet<ProductImage> ProductImages { get; set; }
        public virtual DbSet<ProductTbl> ProductTbls { get; set; }
        public virtual DbSet<PSizeTbl> PSizeTbls { get; set; }
        public virtual DbSet<SizeTbl> SizeTbls { get; set; }
        public virtual DbSet<SliderTbl> SliderTbls { get; set; }
        public virtual DbSet<UserRegister> UserRegisters { get; set; }
        public virtual DbSet<BannerPTTbl> BannerPTTbls { get; set; }
        public virtual DbSet<BSubTitleDetailTbl> BSubTitleDetailTbls { get; set; }
        public virtual DbSet<QueryTbl> QueryTbls { get; set; }
        public virtual DbSet<VProduct> VProducts { get; set; }
        public virtual DbSet<AutocompleteSuggestion> AutocompleteSuggestions { get; set; }
        public virtual DbSet<FestivalBannerTbl> FestivalBannerTbls { get; set; }
    }
}
