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
    
    public partial class ProductImage
    {
        public long PImageId { get; set; }
        public Nullable<long> ProductId { get; set; }
        public string PImage { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<int> ImageIndex { get; set; }
    }
}
