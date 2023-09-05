﻿using GiftChoice.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GiftChoice.Controllers
{
    public class GiftDashBoardController : Controller
    {
        GiftChoiceEntities db = new GiftChoiceEntities();
        // GET: GiftDashBoard
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetMenu()
        {
            var res = new
            {
                MenuData = db.MainCateTbls.Select(m => new
                {
                    m.MainCateId,
                    m.MTitle,
                    Keyword = db.MCKeywordTbls.Where(k => k.MainCateId == m.MainCateId).Select(k => new
                    {
                        k.KeywordId,
                        k.MainCateId,
                        k.MCkeywordId,
                        Keywordtitle = db.KeywordTbls.Where(r => r.KeywordId == k.KeywordId).Select(r => r.Keyword).FirstOrDefault()
                    })
                })
            };
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public ActionResult AddMainCate()
        {
            return View();
        }


        public ActionResult AddKeyword()
        {
            return View();
        }

        public ActionResult AddProduct()
        {
            return View();
        }

        public ActionResult AddSlider()
        {
            return View();
        }
        public ActionResult AddBanner()
        {
            return View();
        }


        public class MainCateTblModel
        {
            public long MainCateId { get; set; }
            public string MTitle { get; set; }
            public string MUrl { get; set; }
            public Nullable<bool> Active { get; set; }
            public Nullable<long> Priority { get; set; }
            public Nullable<System.DateTime> Create_at { get; set; }
            public Nullable<System.DateTime> Update_at { get; set; }
            public string MImage { get; set; }
            public HttpPostedFileBase Image { get; set; }

            public Nullable<long> UserId { get; set; }
            public List<KeywordTbl> keywordTbls { get; set; }
        }

        public JsonResult SubmitMainCate(MainCateTblModel model)
        {
            try
            {
                MainCateTbl mainCateTbl = new MainCateTbl();
                mainCateTbl.MainCateId = db.MainCateTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.MainCateId) + 1;


                mainCateTbl.MTitle = model.MTitle;
                mainCateTbl.MUrl = model.MTitle.Replace(" ", "-");
                if (model.Image != null)
                {
                    string extensionstuimg = Path.GetExtension(model.Image.FileName);
                    model.Image.SaveAs(Server.MapPath("~/images/MainCate/" + mainCateTbl.MainCateId + "" + extensionstuimg));
                    mainCateTbl.MImage = mainCateTbl.MainCateId + "" + extensionstuimg;
                }
                mainCateTbl.Create_at = DateTime.Now;
                mainCateTbl.Update_at = DateTime.Now;
                mainCateTbl.Active = true;
                mainCateTbl.Priority = model.Priority;
                db.MainCateTbls.Add(mainCateTbl);
                db.SaveChanges();
                var res = new { res = "1", MainCateId = mainCateTbl.MainCateId };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult KeywordArrayData(MainCateTblModel model)
        {

            try
            {

                MainCateTbl result = db.MainCateTbls.Where(c => c.MainCateId == model.MainCateId).FirstOrDefault();

                if (result == null)
                {
                    var res1 = new { res = "0" };
                    return Json(res1, JsonRequestBehavior.AllowGet);
                }


                if (model.keywordTbls != null)
                {
                    for (int i = 0; i < model.keywordTbls.Count; i++)
                    {
                        MCKeywordTbl mCKeyword = new MCKeywordTbl();
                        mCKeyword.MCkeywordId = db.MCKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.MCkeywordId) + 1;
                        mCKeyword.MainCateId = model.MainCateId;
                        mCKeyword.KeywordId = model.keywordTbls[i].KeywordId;
                        mCKeyword.Active = true;
                        db.MCKeywordTbls.Add(mCKeyword);
                        db.SaveChanges();

                    }
                }

                var res = new { res = "1", };
                return Json(res, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                var md = ex.Message;
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult UpdateMainCate(MainCateTblModel model)
        {
            try
            {
                var result = db.MainCateTbls.FirstOrDefault(p => p.MainCateId == model.MainCateId);
                if (result != null)
                {
                    if (model.Image != null)
                    {
                        string extensionstuimg = Path.GetExtension(model.Image.FileName);
                        model.Image.SaveAs(Server.MapPath("~/images/MainCate/" + result.MainCateId + "" + extensionstuimg));
                        result.MImage = result.MainCateId + "" + extensionstuimg;
                    }
                    result.MTitle = model.MTitle;
                    result.MUrl = result.MTitle.Replace(" ", "-");
                    result.Priority = model.Priority;
                    result.Update_at = DateTime.Now;
                    db.SaveChanges();

                }
                var res = new { res = "1" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult UpdateKeywordArrayData(MainCateTblModel model)
        {

            try
            {

                MainCateTbl result = db.MainCateTbls.Where(c => c.MainCateId == model.MainCateId).FirstOrDefault();

                if (result == null)
                {
                    var res1 = new { res = "0" };
                    return Json(res1, JsonRequestBehavior.AllowGet);
                }


                var totoid = db.MCKeywordTbls.Where(p => p.MainCateId == model.MainCateId);
                db.MCKeywordTbls.RemoveRange(totoid);
                db.SaveChanges();

                if (model.keywordTbls != null)
                {
                    for (int i = 0; i < model.keywordTbls.Count; i++)
                    {
                        MCKeywordTbl mCKeyword = new MCKeywordTbl();
                        mCKeyword.MCkeywordId = db.MCKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.MCkeywordId) + 1;
                        mCKeyword.MainCateId = model.MainCateId;
                        mCKeyword.KeywordId = model.keywordTbls[i].KeywordId;
                        mCKeyword.Active = true;
                        db.MCKeywordTbls.Add(mCKeyword);
                        db.SaveChanges();

                    }
                }

                var res = new { res = "1", };
                return Json(res, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                var md = ex.Message;
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMainCate()
        {
            var res =

               db.MainCateTbls.Select(m => new
               {
                   m.MainCateId,
                   m.MUrl,
                   m.MTitle,
                   m.Active,
                   m.MImage,
                   m.Priority,
                   Submenu = db.MCKeywordTbls.Where(s => s.MainCateId == m.MainCateId && s.Active == true).Select(s => new
                   {
                       s.MainCateId,
                       s.KeywordId,
                       s.MCkeywordId,
                       SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId).Select(t => t.Keyword).FirstOrDefault()
                   })
               });
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetMainCateData()
        {
            var res =

               db.MainCateTbls.Select(m => new
               {
                   m.MainCateId,
                   m.MUrl,
                   m.MTitle,
                   m.Active,
                   m.MImage,
                   m.Priority,

               });
            return Json(res, JsonRequestBehavior.AllowGet);

        }

       
        public JsonResult GetKeywords()
        {
            var res = db.KeywordTbls.Select(k => new { k.Keyword, k.Active, k.KeywordId });
            return Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetKeywordData()
        {
            var res = db.KeywordTbls.Select(k => new { k.Keyword, k.Active, k.KeywordId });
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SubmitKeyword(KeywordTbl model)
        {
            try
            {

                model.KeywordId = db.KeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.KeywordId) + 1;


                model.Keyword = model.Keyword;
                model.KUrl = model.Keyword.Replace(" ", "-");
                model.Create_at = DateTime.Now;
                model.Update_at = DateTime.Now;
                model.Active = true;
                model.Priority = model.Priority;
                db.KeywordTbls.Add(model);
                db.SaveChanges();
                var res = new { res = "1" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult UpadateKeyword(KeywordTbl model)
        {
            try
            {
                var result = db.KeywordTbls.FirstOrDefault(p => p.KeywordId == model.KeywordId);
                if (result != null)
                {
                    result.Keyword = model.Keyword;
                    db.SaveChanges();

                }
                var res = new { res = "1" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult MainCateActiveDeActive(int id)
        {
            try
            {
                var jb = db.MainCateTbls.Where(c => c.MainCateId == id).FirstOrDefault();
                if (jb != null)
                {

                    jb.Active = jb.Active == true ? false : true;
                    db.SaveChanges();
                    var res = new { res = "1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var res = new { res = "2" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult KeywordActiveDeActive(int id)
        {
            try
            {
                var jb = db.KeywordTbls.Where(c => c.KeywordId == id).FirstOrDefault();
                if (jb != null)
                {

                    jb.Active = jb.Active == true ? false : true;
                    db.SaveChanges();
                    var res = new { res = "1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var res = new { res = "2" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }

        }


        //// Product Code 

        public JsonResult GetProduct()
        {
            var res =

               db.ProductTbls.Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Price,
                   m.PUrl,
                   m.Active,                   
                   m.Priority,
                   ProductImage = db.ProductImages.Where(i => i.PImageId == m.ProductId).Select(i => i.PImage),
                   Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),
                   Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   {
                       s.ProductId,
                       s.KeywordId,
                       s.PKeywordId,
                       SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                   })
               });
            return Json(res, JsonRequestBehavior.AllowGet);

        }


        public partial class ProductTblmodel
        {
            public long ProductId { get; set; }
            public Nullable<long> MainCateId { get; set; }
            public string ProductTitle { get; set; }
            public Nullable<double> Price { get; set; }
            public string PUrl { get; set; }
            public string PLabel { get; set; }
            public string PDesc { get; set; }
            public Nullable<long> Priority { get; set; }
            public Nullable<bool> Active { get; set; }
            public Nullable<System.DateTime> Create_at { get; set; }
            public Nullable<System.DateTime> Update_at { get; set; }
            public Nullable<long> UserID { get; set; }

            public HttpPostedFileBase Image1 { get; set; }
            public HttpPostedFileBase Image2 { get; set; }
            public HttpPostedFileBase Image3 { get; set; }
            public HttpPostedFileBase Image4 { get; set; }
            public HttpPostedFileBase Image5 { get; set; }
            public List<KeywordTbl> KeywordTbls { get; set; }


        }



        public JsonResult SubmitProduct(ProductTblmodel model)
        {

            try
            {
                ProductTbl productmodel = new ProductTbl();

                ProductTbl result = db.ProductTbls.Where(c => c.ProductTitle == model.ProductTitle).FirstOrDefault();
                if (result != null)
                {
                    var res = new { res = "-1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    productmodel.ProductId = db.ProductTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.ProductId) + 1;

                    productmodel.MainCateId = model.MainCateId;
                    productmodel.ProductTitle = model.ProductTitle;
                    productmodel.Active = true;
                    productmodel.PUrl = model.ProductTitle.Replace(" ", "-");
                    productmodel.PDesc = model.PDesc;
                    productmodel.PLabel = model.PLabel;
                    productmodel.Price = model.Price;
                    productmodel.Create_at = DateTime.Now;
                    productmodel.Update_at = DateTime.Now;
                    productmodel.Priority = model.Priority;
                    db.ProductTbls.Add(productmodel);
                    db.SaveChanges();

                    if (model.Image1 != null)
                    {
                        ProductImage productImage = new ProductImage();
                        productImage.PImageId = db.ProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                        string extensionstuimg = Path.GetExtension(model.Image1.FileName);
                        model.Image1.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage.PImageId + extensionstuimg));
                        productImage.PImage = productImage.PImageId + extensionstuimg;
                        productImage.ProductId = productmodel.ProductId;
                        productImage.Active = true;
                        db.ProductImages.Add(productImage);
                        db.SaveChanges();
                    }
                    if (model.Image2 != null)
                    {
                        ProductImage productImage = new ProductImage();
                        productImage.PImageId = db.ProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                        string extensionstuimg = Path.GetExtension(model.Image2.FileName);
                        model.Image2.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage.PImageId + extensionstuimg));
                        productImage.PImage = productImage.PImageId + extensionstuimg;
                        productImage.ProductId = productmodel.ProductId;
                        productImage.Active = true;
                        db.ProductImages.Add(productImage);
                        db.SaveChanges();
                    }
                    if (model.Image3 != null)
                    {
                        ProductImage productImage = new ProductImage();
                        productImage.PImageId = db.ProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                        string extensionstuimg = Path.GetExtension(model.Image3.FileName);
                        model.Image3.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage.PImageId + extensionstuimg));
                        productImage.PImage = productImage.PImageId + extensionstuimg;
                        productImage.ProductId = productmodel.ProductId;
                        productImage.Active = true;
                        db.ProductImages.Add(productImage);
                        db.SaveChanges();
                    }
                    if (model.Image4 != null)
                    {
                        ProductImage productImage = new ProductImage();
                        productImage.PImageId = db.ProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                        string extensionstuimg = Path.GetExtension(model.Image4.FileName);
                        model.Image4.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage.PImageId + extensionstuimg));
                        productImage.PImage = productImage.PImageId + extensionstuimg;
                        productImage.ProductId = productmodel.ProductId;
                        productImage.Active = true;
                        db.ProductImages.Add(productImage);
                        db.SaveChanges();
                    }
                    if (model.Image5 != null)
                    {
                        ProductImage productImage = new ProductImage();
                        productImage.PImageId = db.ProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                        string extensionstuimg = Path.GetExtension(model.Image5.FileName);
                        model.Image5.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage.PImageId + extensionstuimg));
                        productImage.PImage = productImage.PImageId + extensionstuimg;
                        productImage.ProductId = productmodel.ProductId;
                        productImage.Active = true;
                        db.ProductImages.Add(productImage);
                        db.SaveChanges();
                    }

                    var res = new { res = "1", ProductId = productmodel.ProductId };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                var md = ex.Message;
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult ProductArrayData(ProductTblmodel model)
        {

            try
            {

                ProductTbl result = db.ProductTbls.Where(c => c.ProductId == model.ProductId).FirstOrDefault();

                if (result != null)
                {
                    result.PDesc = model.PDesc;
                    db.SaveChanges();
                }


                if (model.KeywordTbls != null)
                {
                    for (int i = 0; i < model.KeywordTbls.Count; i++)
                    {
                        PKeywordTbl pKeyword = new PKeywordTbl();
                        pKeyword.PKeywordId = db.PKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.PKeywordId) + 1;
                        pKeyword.ProductId = model.ProductId;
                        pKeyword.Active = true;
                        pKeyword.KeywordId = model.KeywordTbls[i].KeywordId;
                        db.PKeywordTbls.Add(pKeyword);
                        db.SaveChanges();

                    }
                }
                var res = new { res = "1", };
                return Json(res, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                var md = ex.Message;
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ProductActiveDeActive(int id)
        {
            try
            {
                var jb = db.ProductTbls.Where(c => c.MainCateId == id).FirstOrDefault();
                if (jb != null)
                {

                    jb.Active = jb.Active == true ? false : true;
                    db.SaveChanges();
                    var res = new { res = "1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var res = new { res = "2" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }

        }

        //// Slider 
        public JsonResult SubmitSlider(SliderTbl model)
        {
            // public HttpPostedFileBase Image { get; set; }
            try
            {
                SliderTbl rws = new SliderTbl();

                SliderTbl result = db.SliderTbls.Where(c => c.Priority == model.Priority).FirstOrDefault();
                if (result != null)
                {
                    var res = new { res = "-1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    rws.SliderId = db.SliderTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.SliderId) + 1;

                    if (model.Image != null)
                    {
                        string extensionstuimg = Path.GetExtension(model.Image.FileName);
                       model.Image.SaveAs(Server.MapPath("~/images/SliderImg/" + rws.SliderId + "" + extensionstuimg));
                        rws.SliderImage = rws.SliderId + "" + extensionstuimg;
                    }
                    rws.MainCateId = model.MainCateId;
                    rws.Priority = model.Priority;
                    rws.SUrl = db.MainCateTbls.Where(m => m.MainCateId == model.MainCateId).Select(m => m.MUrl).FirstOrDefault();
                    rws.Active = true;
                    db.SliderTbls.Add(rws);
                    db.SaveChanges();
                    var res = new { res = "1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                var md = ex.Message;
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult UpdateSlider(SliderTbl model)
        {
            // public HttpPostedFileBase Image { get; set; }
            try
            {


                SliderTbl result = db.SliderTbls.Where(c => c.SliderId != model.SliderId && c.Priority == model.Priority).FirstOrDefault();
                if (result != null)
                {
                    var res = new { res = "-1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var rws = db.SliderTbls.Where(r => r.SliderId == model.SliderId).FirstOrDefault();

                    if (model.Image != null)
                    {
                        string extensionstuimg = Path.GetExtension(model.Image.FileName);
                         model.Image.SaveAs(Server.MapPath("~/images/SliderImg/" + model.SliderId + "" + extensionstuimg));
                        rws.SliderImage = model.SliderId + "" + extensionstuimg;
                    }
                   
                    rws.Priority = model.Priority;
                    rws.MainCateId = model.MainCateId;
                    rws.SUrl = db.MainCateTbls.Where(m => m.MainCateId == model.MainCateId).Select(m => m.MUrl).FirstOrDefault();
                    db.SaveChanges();
                    var res = new { res = "1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                var md = ex.Message;
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ADAcDcShortPage(int id)
        {
            var jb = db.SliderTbls.Where(c => c.SliderId == id).FirstOrDefault();
            if (jb != null)
            {
                jb.Active = jb.Active == true ? false : true;
                db.SaveChanges();
                var res = new { res = "1" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var res = new { res = "2" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult SliderList()
        {

            var res = db.SliderTbls.ToList().OrderBy(c => c.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSliderDetail(int id)
        {
            var res = db.SliderTbls.Where(d => d.SliderId == id).FirstOrDefault();

            return Json(res, JsonRequestBehavior.AllowGet);

        }
    }
}