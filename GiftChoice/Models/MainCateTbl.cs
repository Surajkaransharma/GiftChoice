//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class MainCateTbl
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MainCateTbl()
        {
            this.MCKeywordTbls = new HashSet<MCKeywordTbl>();
        }
    
        public long MainCateId { get; set; }
        public string MTitle { get; set; }
        public string MUrl { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<long> Priority { get; set; }
        public Nullable<System.DateTime> Create_at { get; set; }
        public Nullable<System.DateTime> Update_at { get; set; }
        public string MImage { get; set; }
        public Nullable<long> UserId { get; set; }
        public string MainCateType { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MCKeywordTbl> MCKeywordTbls { get; set; }
    }
}
