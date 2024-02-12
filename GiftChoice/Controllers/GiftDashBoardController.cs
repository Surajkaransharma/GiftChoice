using GiftChoice.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Razor.Tokenizer.Symbols;

namespace GiftChoice.Controllers
{
    [AuthorizationFilter]
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

        public ActionResult AddLabelProduct()
        {
            return View();
        }

        public ActionResult AddSize()
        {
            return View();
        }


        public ActionResult FestivalBanner()
        {
            return View();
        }

        public ActionResult AddRelation()
        {
            return View();

        }

        public ActionResult AddQueryKeyword()
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

        public ActionResult AddBannerInProduct()
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

        public ActionResult AddBannerMateCate()
        {
            return View();
        }

        public ActionResult AddBannerCateProduct()
        {
            return View();
        }

        public ActionResult AddBannerQAndAnswer()
        {
            return View();
        }

        public ActionResult AddPBanner()
        {
            return View();
        }

        public ActionResult OrderList()
        {
            return View();
        }


        public class MainCateTblModel
        {
            public string MainCateType { get; set; }

            public string Menu { get; set; }
            public string Position { get; set; }

            public long MainCateId { get; set; }
            public string MTitle { get; set; }
            public string MUrl { get; set; }
            public Nullable<bool> Active { get; set; }
            public Nullable<long> Priority { get; set; }
            public Nullable<System.DateTime> Create_at { get; set; }
            public Nullable<System.DateTime> Update_at { get; set; }
            public string MImage { get; set; }
            public HttpPostedFileBase Image { get; set; }
            public Nullable<bool> ModelQuery1 { get; set; }
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
                    MainCateVaryQualityLevel(model.Image.InputStream, mainCateTbl.MainCateId + extensionstuimg);
                    mainCateTbl.MImage = mainCateTbl.MainCateId + "" + extensionstuimg;
                }
                mainCateTbl.Create_at = DateTime.Now;
                mainCateTbl.Update_at = DateTime.Now;
                mainCateTbl.Active = true;
                mainCateTbl.MainCateType = "Normal";
                mainCateTbl.CateType = "MainCate";
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
                    //     public string Menu { get; set; }
                    for (int i = 0; i < model.keywordTbls.Count; i++)
                    {
                        MCKeywordTbl mCKeyword = new MCKeywordTbl();
                        mCKeyword.MCkeywordId = db.MCKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.MCkeywordId) + 1;
                        mCKeyword.MainCateId = model.MainCateId;
                        mCKeyword.Menu = model.keywordTbls[i].Menu == "Menu" ? true : false;
                        mCKeyword.Fliter = model.keywordTbls[i].Menu == "Fliter" ? true : false;

                        mCKeyword.MenuFilter = model.keywordTbls[i].Menu == "MenuFilter" ? true : false;

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

        private void MainCateVaryQualityLevel(Stream stream, string fname)
        {
            //  size 
            System.Drawing.Image photo = new Bitmap(stream);
            //Bitmap bmp1 = new Bitmap(photo, 119, 83);

            Bitmap bmp1 = new Bitmap(photo, 318, 318);
            // without size
            //  Bitmap bmp1 = new Bitmap(stream);
            ImageCodecInfo jgpEncoder = GetEncoder(ImageFormat.Jpeg);
            System.Drawing.Imaging.Encoder myEncoder = System.Drawing.Imaging.Encoder.Quality;
            EncoderParameters myEncoderParameters = new EncoderParameters(1);
            EncoderParameter myEncoderParameter = new EncoderParameter(myEncoder, 30L);
            myEncoderParameters.Param[0] = myEncoderParameter;
            bmp1.Save(Server.MapPath("~/images/MainCate/" + fname), jgpEncoder, myEncoderParameters);
            bmp1.Dispose();

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
                        MainCateVaryQualityLevel(model.Image.InputStream, result.MainCateId + extensionstuimg);
                        result.MImage = result.MainCateId + "" + extensionstuimg;
                    }
                    result.MTitle = model.MTitle;
                    result.MUrl = result.MTitle.Replace(" ", "-");
                    result.Priority = model.Priority;
                    result.Update_at = DateTime.Now;
                    db.SaveChanges();

                }
                var res = new { res = "1", MainCateId = result.MainCateId };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public class maincatetypemodel
        {
            public List<MainCateTblModel> MainCateTblModel { get; set; }
        }
        public JsonResult UpdateMainCateType(maincatetypemodel model)
        {
            try
            {
                for (int i = 0; i < model.MainCateTblModel.Count(); i++)
                {
                    long mainid = model.MainCateTblModel[i].MainCateId;
                    var result = db.MainCateTbls.FirstOrDefault(p => p.MainCateId == mainid);
                    if (result != null)
                    {
                        result.MainCateType = model.MainCateTblModel[i].MainCateType;
                        db.SaveChanges();

                    }
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
                        mCKeyword.Menu = model.keywordTbls[i].Menu == "Menu" ? true : false;
                        mCKeyword.Fliter = model.keywordTbls[i].Menu == "Fliter" ? true : false;
                        mCKeyword.MenuFilter = model.keywordTbls[i].Menu == "MenuFilter" ? true : false;
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
                   m.MainCateType,
                   Submenu = db.MCKeywordTbls.Where(s => s.MainCateId == m.MainCateId && s.Active == true).Select(s => new
                   {
                       s.MainCateId,
                       s.KeywordId,
                       s.MCkeywordId,
                       s.Menu,
                       s.MenuFilter,
                       s.Fliter,
                       SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId).Select(t => t.Keyword).FirstOrDefault()
                   })
               }).OrderBy(m => m.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetMainCateData()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var res =

               db.MainCateTbls.Where(m => m.Active == true).Select(m => new
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

        public JsonResult GetBannerCategoryData()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var res =

               db.BannerCateTbls.Select(m => new
               {
                   m.BannerCateId,
                   m.BUrl,
                   m.BTitle,
                   m.Active,
                   m.Priority,

               });
            return Json(res, JsonRequestBehavior.AllowGet);

        }



        public JsonResult GetKeywordData()
        {
            var res = db.KeywordTbls.Where(k => k.Active == true).Select(k => new { k.Keyword, k.Active, k.KeywordId });
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetSizeData()
        {
            var res = db.SizeTbls.Where(k => k.Active == true);
            return Json(res, JsonRequestBehavior.AllowGet);

        }





        /////// Keyword Code start 

        public JsonResult GetKeywords()
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
                    result.KUrl = result.Keyword.Replace(" ", "-");
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


        /////// Keyword Code End 
        //// Product Code 

        public JsonResult GetProduct(int id)
        {
            var res =

               db.ProductTbls.Where(m => id == -2 ? true : m.MainCateId == id && m.Active == true).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Price,
                   m.PUrl,
                   m.Active,
                   m.TableDesc,
                   m.VideoUrl,
                   m.SameDay,
                   m.PDesc,
                   m.LabelId,
                   m.Priority,
                   labelTitle = db.LabelProductTbls.Where(q => q.LabelId == m.LabelId).Select(q => q.LTitle).FirstOrDefault(),
                   ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage),
                   Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),
                   Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   {
                       s.ProductId,
                       s.KeywordId,
                       s.PKeywordId,
                       SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                   }),
                   PSizeList = db.PSizeTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   {
                       s.ProductId,
                       s.SizeId,
                       s.PSizeId,
                       SizeTitle = db.SizeTbls.Where(t => t.SizeId == s.SizeId && t.Active == true).Select(t => t.SizeTitle).FirstOrDefault()
                   })
               });
            return Json(res, JsonRequestBehavior.AllowGet);

        }


        public JsonResult GetAllProduct()
        {
            var res =

               db.ProductTbls.Where(m => m.Active == true).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Price,
                   m.PUrl,
                   m.TableDesc,
                   m.Active,
                   m.PDesc,
                   m.Priority,
                   ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage),
                   Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),
                   //Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   //{
                   //    s.ProductId,
                   //    s.KeywordId,
                   //    s.PKeywordId,
                   //    SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                   //}),
                   //PSizeList = db.PSizeTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   //{
                   //    s.ProductId,
                   //    s.SizeId,
                   //    s.PSizeId,
                   //    SizeTitle = db.SizeTbls.Where(t => t.SizeId == s.SizeId && t.Active == true).Select(t => t.SizeTitle).FirstOrDefault()
                   //})
               });
            return Json(res, JsonRequestBehavior.AllowGet);

        }


        public partial class ProductTblmodel
        {
            public string ProductType { get; set; }

            public Nullable<int> BannerCateId { get; set; }

            public string Video { get; set; }

            public Nullable<int> LabelId { get; set; }

            public long ProductId { get; set; }
            public Nullable<long> MainCateId { get; set; }
            public string ProductTitle { get; set; }
            public Nullable<double> Price { get; set; }
            public string PUrl { get; set; }
            public string PLabel { get; set; }
            public string PDesc { get; set; }
            public string TableDesc { get; set; }

            public string PDesc1 { get; set; }

            public Nullable<long> Priority { get; set; }
            public Nullable<bool> Active { get; set; }
            public Nullable<System.DateTime> Create_at { get; set; }
            public Nullable<System.DateTime> Update_at { get; set; }
            public Nullable<long> UserID { get; set; }

            public HttpPostedFileBase VideoData { get; set; }


            public HttpPostedFileBase Image1 { get; set; }
            public HttpPostedFileBase Image2 { get; set; }
            public HttpPostedFileBase Image3 { get; set; }
            public HttpPostedFileBase Image4 { get; set; }
            public HttpPostedFileBase Image5 { get; set; }
            public List<KeywordTbl> KeywordTbls { get; set; }
            public List<BannerQueryListTbl> bannerQueryListTbls { get; set; }

            public List<SizeTbl> SizeTbls { get; set; }
            public List<BPSizeTbl> BPSizeTbl { get; set; }

            public string VideoUrl { get; set; }

            public Nullable<bool> SameDay { get; set; }
            public Nullable<int> QueryId { get; set; }

            public Nullable<int> BSubId { get; set; }

            public Nullable<int> BSubDId { get; set; }


        }


        private ImageCodecInfo GetEncoder(ImageFormat format)
        {
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();

            foreach (ImageCodecInfo codec in codecs)
            {
                if (codec.FormatID == format.Guid)
                {
                    return codec;
                }
            }
            return null;

        }

        private void ProductVaryQualityLevel(Stream stream, string fname)
        {
            //  size 
            System.Drawing.Image photo = new Bitmap(stream);
            //Bitmap bmp1 = new Bitmap(photo, 119, 83);

            Bitmap bmp1 = new Bitmap(photo, 550, 550);
            // without size
            //  Bitmap bmp1 = new Bitmap(stream);
            ImageCodecInfo jgpEncoder = GetEncoder(ImageFormat.Jpeg);
            System.Drawing.Imaging.Encoder myEncoder = System.Drawing.Imaging.Encoder.Quality;
            EncoderParameters myEncoderParameters = new EncoderParameters(1);
            EncoderParameter myEncoderParameter = new EncoderParameter(myEncoder, 30L);
            myEncoderParameters.Param[0] = myEncoderParameter;
            bmp1.Save(Server.MapPath("~/images/ProductImg/" + fname), jgpEncoder, myEncoderParameters);
            bmp1.Dispose();

        }

        public JsonResult SubmitProduct(ProductTblmodel model)
        {

            try
            {
                ProductTbl productmodel = new ProductTbl();

                ProductTbl result = db.ProductTbls.Where(c => c.ProductTitle == model.ProductTitle && c.ProductType == model.ProductType).FirstOrDefault();
                if (result != null)
                {
                    var res = new { res = "-1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    productmodel.ProductId = db.ProductTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.ProductId) + 1;

                    productmodel.MainCateId = model.MainCateId;
                    productmodel.BannerCateId = model.BannerCateId;

                    productmodel.ProductTitle = model.ProductTitle;
                    productmodel.LabelId = model.LabelId;
                    productmodel.Active = true;
                    productmodel.PUrl = model.ProductTitle.Replace(" ", "-");
                    productmodel.PDesc = model.PDesc;
                    productmodel.PLabel = model.PLabel == null ? "" : model.PLabel;
                    productmodel.Price = model.Price;
                    productmodel.Qty = 1;
                    productmodel.VideoUrl = model.VideoUrl ?? "";
                    productmodel.SameDay = model.SameDay;
                    productmodel.ProductType = model.ProductType;

                    productmodel.Create_at = DateTime.Now;
                    productmodel.Update_at = DateTime.Now;
                    productmodel.Priority = model.Priority;
                    if (model.VideoData != null)
                    {
                        string extensionstuimg = Path.GetExtension(model.VideoData.FileName);
                        model.VideoData.SaveAs(Server.MapPath("~/images/ProductVideo/" + productmodel.ProductId + extensionstuimg));
                        productmodel.Video = productmodel.ProductId + extensionstuimg;

                    }
                    db.ProductTbls.Add(productmodel);
                    db.SaveChanges();

                    if (model.Image1 != null)
                    {
                        ProductImage productImage = new ProductImage();
                        productImage.PImageId = db.ProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                        string extensionstuimg = Path.GetExtension(model.Image1.FileName);
                        model.Image1.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage.PImageId + extensionstuimg));
                        ProductVaryQualityLevel(model.Image1.InputStream, productImage.PImageId + extensionstuimg);
                        productImage.ImageIndex = 1;
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
                        //  VaryQualityLevel(model.Image1.InputStream, productImage.PImageId + extensionstuimg);
                        model.Image2.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage.PImageId + extensionstuimg));
                        ProductVaryQualityLevel(model.Image2.InputStream, productImage.PImageId + extensionstuimg);
                        productImage.ImageIndex = 2;

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
                        ProductVaryQualityLevel(model.Image3.InputStream, productImage.PImageId + extensionstuimg);
                        productImage.ImageIndex = 3;

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
                        ProductVaryQualityLevel(model.Image4.InputStream, productImage.PImageId + extensionstuimg);
                        productImage.ImageIndex = 4;

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
                        ProductVaryQualityLevel(model.Image5.InputStream, productImage.PImageId + extensionstuimg);
                        productImage.ImageIndex = 5;
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


        public JsonResult ProductArrayData(ProductTblmodel model, List<ProductDetailTbl> productDataArray)
        {

            try
            {

                ProductTbl result = db.ProductTbls.Where(c => c.ProductId == model.ProductId).FirstOrDefault();

                if (result != null)
                {
                    result.TableDesc = model.TableDesc;
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

                if (model.SizeTbls != null)
                {
                    for (int i = 0; i < model.SizeTbls.Count; i++)
                    {
                        PSizeTbl pSizeTbl = new PSizeTbl();
                        pSizeTbl.PSizeId = db.PSizeTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.PSizeId) + 1;
                        pSizeTbl.ProductId = model.ProductId;
                        pSizeTbl.Active = true;
                        pSizeTbl.SizeId = model.SizeTbls[i].SizeId;
                        db.PSizeTbls.Add(pSizeTbl);
                        db.SaveChanges();

                    }
                }
                if (productDataArray != null)
                {

                    for (int i = 0; i < productDataArray.Count; i++)
                    {
                        ProductDetailTbl productDetail = new ProductDetailTbl();
                        productDetail.PdId = db.ProductDetailTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.PdId) + 1;
                        productDetail.ProductId = result.ProductId;
                        productDetail.SizeId = productDataArray[i].SizeId;
                        productDetail.Price = productDataArray[i].Price;
                        productDetail.ProductType = result.ProductType;
                        productDetail.Priority = productDataArray[i].Priority;
                        productDetail.Active = true;
                        db.ProductDetailTbls.Add(productDetail);
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
                var jb = db.ProductTbls.Where(c => c.ProductId == id).FirstOrDefault();
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

        public JsonResult ProductOrderCompelete(int id)
        {
            try
            {
                var jb = db.OrderMainTbls.Where(c => c.MorderId == id).FirstOrDefault();
                if (jb != null)
                {
                    jb.Delivery = true;
                    //  jb.Delivery = jb.Delivery == true ? false : true;
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


        public JsonResult UpdateProductData(ProductTblmodel model)
        {
            try
            {

                ProductTbl result = db.ProductTbls.Where(c => c.ProductId == model.ProductId).FirstOrDefault();
                if (result != null)
                {


                    result.MainCateId = model.MainCateId;
                    result.BannerCateId = model.BannerCateId;
                    result.ProductTitle = model.ProductTitle;
                    result.LabelId = model.LabelId;
                    result.PUrl = model.ProductTitle.Replace(" ", "-");
                    result.PLabel = model.PLabel == null ? "" : model.PLabel;
                    result.Price = model.Price;
                    result.VideoUrl = model.VideoUrl ?? "";
                    result.SameDay = model.SameDay;
                    result.ProductType = model.ProductType;
                    if (model.VideoData != null)
                    {
                        string extensionstuimg = Path.GetExtension(model.VideoData.FileName);
                        model.VideoData.SaveAs(Server.MapPath("~/images/ProductVideo/" + result.ProductId + extensionstuimg));
                        result.Video = result.ProductId + extensionstuimg;

                    }
                    result.Update_at = DateTime.Now;
                    result.Priority = model.Priority;
                    db.SaveChanges();

                    if (model.Image1 != null)
                    {
                        var productImage = db.ProductImages.Where(c => c.ProductId == result.ProductId && c.ImageIndex == 1).FirstOrDefault();

                        if (productImage != null)
                        {
                            var Pimageid = productImage.PImageId;
                            ProductImage pimagearr = db.ProductImages.Where(c => c.PImageId == Pimageid).FirstOrDefault();
                            string extensionstuimg = Path.GetExtension(model.Image1.FileName);

                            model.Image1.SaveAs(Server.MapPath("~/images/ProductImg/" + pimagearr.PImageId + extensionstuimg));
                            ProductVaryQualityLevel(model.Image1.InputStream, Pimageid + extensionstuimg);
                            pimagearr.PImage = pimagearr.PImageId + extensionstuimg;
                            db.SaveChanges();
                        }
                        else
                        {
                            ProductImage productImage1 = new ProductImage();
                            productImage1.PImageId = db.ProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                            string extensionstuimg = Path.GetExtension(model.Image1.FileName);
                            model.Image1.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage1.PImageId + extensionstuimg));
                            ProductVaryQualityLevel(model.Image1.InputStream, productImage1.PImageId + extensionstuimg);
                            productImage1.PImage = productImage1.PImageId + extensionstuimg;
                            productImage1.ImageIndex = 1;
                            productImage1.ProductId = result.ProductId;
                            productImage1.Active = true;
                            db.ProductImages.Add(productImage1);
                            db.SaveChanges();
                        }

                    }


                    if (model.Image2 != null)
                    {
                        var productImage = db.ProductImages.Where(c => c.ProductId == result.ProductId && c.ImageIndex == 2).FirstOrDefault();

                        if (productImage != null)
                        {
                            var Pimageid = productImage.PImageId;
                            ProductImage pimagearr = db.ProductImages.Where(c => c.PImageId == Pimageid).FirstOrDefault();
                            string extensionstuimg = Path.GetExtension(model.Image2.FileName);
                            model.Image2.SaveAs(Server.MapPath("~/images/ProductImg/" + pimagearr.PImageId + extensionstuimg));
                            ProductVaryQualityLevel(model.Image2.InputStream, Pimageid + extensionstuimg);
                            pimagearr.PImage = pimagearr.PImageId + extensionstuimg;
                            db.SaveChanges();
                        }
                        else
                        {
                            ProductImage productImage1 = new ProductImage();
                            productImage1.PImageId = db.ProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                            string extensionstuimg = Path.GetExtension(model.Image2.FileName);
                            model.Image2.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage1.PImageId + extensionstuimg));
                            ProductVaryQualityLevel(model.Image2.InputStream, productImage1.PImageId + extensionstuimg);
                            productImage1.PImage = productImage1.PImageId + extensionstuimg;
                            productImage1.ProductId = result.ProductId;
                            productImage1.ImageIndex = 2;

                            productImage1.Active = true;
                            db.ProductImages.Add(productImage1);
                            db.SaveChanges();
                        }

                    }
                    if (model.Image3 != null)
                    {
                        var productImage = db.ProductImages.Where(c => c.ProductId == result.ProductId && c.ImageIndex == 3).FirstOrDefault();

                        if (productImage != null)
                        {
                            var Pimageid = productImage.PImageId;
                            ProductImage pimagearr = db.ProductImages.Where(c => c.PImageId == Pimageid).FirstOrDefault();
                            string extensionstuimg = Path.GetExtension(model.Image3.FileName);
                            model.Image3.SaveAs(Server.MapPath("~/images/ProductImg/" + pimagearr.PImageId + extensionstuimg));
                            ProductVaryQualityLevel(model.Image3.InputStream, pimagearr.PImageId + extensionstuimg);
                            pimagearr.PImage = pimagearr.PImageId + extensionstuimg;
                            db.SaveChanges();
                        }
                        else
                        {
                            ProductImage productImage1 = new ProductImage();
                            productImage1.PImageId = db.ProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                            string extensionstuimg = Path.GetExtension(model.Image3.FileName);
                            model.Image3.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage1.PImageId + extensionstuimg));
                            ProductVaryQualityLevel(model.Image3.InputStream, productImage1.PImageId + extensionstuimg);
                            productImage1.PImage = productImage1.PImageId + extensionstuimg;
                            productImage1.ProductId = result.ProductId;
                            productImage1.ImageIndex = 3;
                            productImage1.Active = true;
                            db.ProductImages.Add(productImage1);
                            db.SaveChanges();
                        }

                    }
                    if (model.Image4 != null)
                    {
                        var productImage = db.ProductImages.Where(c => c.ProductId == result.ProductId && c.ImageIndex == 4).FirstOrDefault();

                        if (productImage != null)
                        {
                            var Pimageid = productImage.PImageId;
                            ProductImage pimagearr = db.ProductImages.Where(c => c.PImageId == Pimageid).FirstOrDefault();
                            string extensionstuimg = Path.GetExtension(model.Image4.FileName);
                            model.Image4.SaveAs(Server.MapPath("~/images/ProductImg/" + pimagearr.PImageId + extensionstuimg));
                            ProductVaryQualityLevel(model.Image1.InputStream, pimagearr.PImageId + extensionstuimg);
                            pimagearr.PImage = pimagearr.PImageId + extensionstuimg;
                            db.SaveChanges();
                        }
                        else
                        {
                            ProductImage productImage1 = new ProductImage();
                            productImage1.PImageId = db.ProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                            string extensionstuimg = Path.GetExtension(model.Image4.FileName);
                            model.Image4.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage1.PImageId + extensionstuimg));
                            ProductVaryQualityLevel(model.Image1.InputStream, productImage1.PImageId + extensionstuimg);
                            productImage1.PImage = productImage1.PImageId + extensionstuimg;
                            productImage1.ProductId = result.ProductId;
                            productImage1.ImageIndex = 4;
                            productImage1.Active = true;
                            db.ProductImages.Add(productImage1);
                            db.SaveChanges();
                        }

                    }
                    if (model.Image5 != null)
                    {
                        var productImage = db.ProductImages.Where(c => c.ProductId == result.ProductId && c.ImageIndex == 5).FirstOrDefault();

                        if (productImage != null)
                        {
                            var Pimageid = productImage.PImageId;
                            ProductImage pimagearr = db.ProductImages.Where(c => c.PImageId == Pimageid).FirstOrDefault();
                            string extensionstuimg = Path.GetExtension(model.Image5.FileName);
                            model.Image5.SaveAs(Server.MapPath("~/images/ProductImg/" + pimagearr.PImageId + extensionstuimg));
                            ProductVaryQualityLevel(model.Image1.InputStream, pimagearr.PImageId + extensionstuimg);
                            pimagearr.PImage = pimagearr.PImageId + extensionstuimg;
                            db.SaveChanges();
                        }
                        else
                        {
                            ProductImage productImage1 = new ProductImage();
                            productImage1.PImageId = db.ProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                            string extensionstuimg = Path.GetExtension(model.Image5.FileName);
                            model.Image5.SaveAs(Server.MapPath("~/images/ProductImg/" + productImage1.PImageId + extensionstuimg));
                            ProductVaryQualityLevel(model.Image1.InputStream, productImage1.PImageId + extensionstuimg);
                            productImage1.PImage = productImage1.PImageId + extensionstuimg;
                            productImage1.ProductId = result.ProductId;
                            productImage1.ImageIndex = 5;

                            productImage1.Active = true;
                            db.ProductImages.Add(productImage1);
                            db.SaveChanges();
                        }

                    }

                }
                var res = new { res = "1", ProductId = result.ProductId };
                return Json(res, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                var md = ex.Message;
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult UpdateProductArrayData(ProductTblmodel model, List<ProductDetailTbl> productDataArray)
        {

            try
            {

                ProductTbl result = db.ProductTbls.Where(c => c.ProductId == model.ProductId).FirstOrDefault();

                if (result != null)
                {
                    result.PDesc = model.PDesc;
                    result.TableDesc = model.TableDesc;
                    db.SaveChanges();

                    var totoid = db.PKeywordTbls.Where(p => p.ProductId == model.ProductId);
                    db.PKeywordTbls.RemoveRange(totoid);
                    db.SaveChanges();
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

                    var Sizeid = db.PSizeTbls.Where(p => p.ProductId == model.ProductId);
                    db.PSizeTbls.RemoveRange(Sizeid);
                    db.SaveChanges();
                    if (model.SizeTbls != null)
                    {
                        for (int i = 0; i < model.SizeTbls.Count; i++)
                        {
                            PSizeTbl pSizeTbl = new PSizeTbl();
                            pSizeTbl.PSizeId = db.PSizeTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.PSizeId) + 1;
                            pSizeTbl.ProductId = model.ProductId;
                            pSizeTbl.Active = true;
                            pSizeTbl.SizeId = model.SizeTbls[i].SizeId;
                            db.PSizeTbls.Add(pSizeTbl);
                            db.SaveChanges();

                        }
                    }

                    // Remove ProductDetail_Tbl records for the given PId
                    var RemoveProductDetail = db.ProductDetailTbls.Where(r => r.ProductId == model.ProductId);
                    db.ProductDetailTbls.RemoveRange(RemoveProductDetail);
                    db.SaveChanges();

                    for (int i = 0; i < productDataArray.Count; i++)
                    {

                        if (productDataArray[i].SizeId != -1)
                        {

                            ProductDetailTbl productDetail = new ProductDetailTbl();
                            productDetail.PdId = db.ProductDetailTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.PdId) + 1;
                            productDetail.ProductId = result.ProductId;
                            productDetail.ProductType = result.ProductType;
                            productDetail.SizeId = productDataArray[i].SizeId;
                            productDetail.Price = productDataArray[i].Price;
                            productDetail.Priority = productDataArray[i].Priority;
                            productDetail.Active = true;
                            db.ProductDetailTbls.Add(productDetail);
                            db.SaveChanges();
                        }

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

            var res = db.SliderTbls.Select(c => new
            {
                c.MainCateId,
                c.SliderId,
                c.Priority,
                c.SliderImage,
                MainCate = db.MainCateTbls.Where(m => m.MainCateId == c.MainCateId).Select(m => m.MTitle).FirstOrDefault(),
                c.Active
            }).OrderBy(c => c.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSliderDetail(int id)
        {
            var res = db.SliderTbls.Where(d => d.SliderId == id).FirstOrDefault();

            return Json(res, JsonRequestBehavior.AllowGet);

        }

        ///// banner
        public JsonResult SubmitBanner(BannerTbl model)
        {
            // public HttpPostedFileBase Image { get; set; }
            try
            {
                BannerTbl rws = new BannerTbl();

                BannerTbl result = db.BannerTbls.Where(c => c.Priority == model.Priority).FirstOrDefault();
                if (result != null)
                {
                    var res = new { res = "-1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    rws.BannerId = db.BannerTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.BannerId) + 1;

                    if (model.Image != null)
                    {
                        string extensionstuimg = Path.GetExtension(model.Image.FileName);
                        model.Image.SaveAs(Server.MapPath("~/images/BannerImage/" + rws.BannerId + "" + extensionstuimg));
                        rws.BannerImage = rws.BannerId + "" + extensionstuimg;
                    }
                    rws.MainCateId = model.MainCateId;
                    rws.Priority = model.Priority;

                    rws.BUrl = db.BannerCateTbls.Where(m => m.BannerCateId == model.MainCateId).Select(m => m.BUrl).FirstOrDefault();
                    rws.Active = true;
                    rws.Create_at = DateTime.Now;
                    rws.Update_at = DateTime.Now;
                    db.BannerTbls.Add(rws);
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
        public JsonResult UpdateBanner(BannerTbl model)
        {
            // public HttpPostedFileBase Image { get; set; }
            try
            {


                BannerTbl result = db.BannerTbls.Where(c => c.BannerId != model.BannerId && c.Priority == model.Priority).FirstOrDefault();
                if (result != null)
                {
                    var res = new { res = "-1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var rws = db.BannerTbls.Where(r => r.BannerId == model.BannerId).FirstOrDefault();

                    if (model.Image != null)
                    {
                        string extensionstuimg = Path.GetExtension(model.Image.FileName);
                        model.Image.SaveAs(Server.MapPath("~/images/BannerImage/" + model.BannerId + "" + extensionstuimg));
                        rws.BannerImage = model.BannerId + "" + extensionstuimg;
                    }

                    rws.Priority = model.Priority;
                    rws.MainCateId = model.MainCateId;
                    rws.BUrl = db.BannerCateTbls.Where(m => m.BannerCateId == model.MainCateId).Select(m => m.BUrl).FirstOrDefault();
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

        public JsonResult ADBanner(int id)
        {
            var jb = db.BannerTbls.Where(c => c.BannerId == id).FirstOrDefault();
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
        public JsonResult BannerList()
        {

            var res = db.BannerTbls.Select(c => new
            {
                c.MainCateId,
                c.BannerId,
                c.Priority,
                c.BannerImage,
                MainCate = db.BannerCateTbls.Where(m => m.BannerCateId == c.MainCateId).Select(m => m.BTitle).FirstOrDefault(),
                c.Active
            }).OrderBy(c => c.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);
        }


        /////// Sixe Code start 

        public JsonResult GetSize()
        {
            var res = db.SizeTbls;
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SubmitSize(SizeTbl model)
        {
            try
            {

                model.SizeId = db.SizeTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.SizeId) + 1;


                model.SizeTitle = model.SizeTitle;
                model.Create_at = DateTime.Now;
                model.Update_at = DateTime.Now;
                model.Active = true;
                model.Priority = model.Priority;
                db.SizeTbls.Add(model);
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

        public JsonResult UpadateSize(SizeTbl model)
        {
            try
            {
                var result = db.SizeTbls.FirstOrDefault(p => p.SizeId == model.SizeId);
                if (result != null)
                {
                    result.SizeTitle = model.SizeTitle;
                    result.Priority = model.Priority;
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

        public JsonResult SizeActiveDeActive(int id)
        {
            try
            {
                var jb = db.SizeTbls.Where(c => c.SizeId == id).FirstOrDefault();
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


        /////// Keyword Code End 
        [JsonNetFilter]
        public JsonResult GetOrder()
        {
            var res =

               db.OrderMainTbls.Where(o => o.Active == true && o.Cancel == false).Select(m => new
               {

                   m.RUserId,
                   m.Active,
                   m.Cancel,
                   m.MorderId,
                   m.TotalAmount,
                   m.Create_at,
                   UserData = db.UserRegisters.Where(u => u.RUserId == m.RUserId).FirstOrDefault(),
                   OrderListData = db.OrderTbls.Where(p => p.MorderId == m.MorderId).Select(p => new
                   {
                       p.PPrice,
                       p.PQty,
                       p.ProductId,
                       p.OrderId,
                       p.MorderId,
                       p.RUserId,

                       ProductDetail = db.VProducts.Where(q => q.ProductId == p.ProductId).FirstOrDefault(),
                       Productimage = db.ProductImages.Where(q => q.ProductId == p.ProductId == q.Active == true).Select(q => q.PImage),

                   })



               });
            return Json(res, JsonRequestBehavior.AllowGet);

        }


        /////// Banner CateBanner Category  

        /////// Sixe Code start 

        public JsonResult GetBannerCate()
        {
            var res =

                   db.BannerCateTbls.Select(m => new
                   {
                       m.BannerCateId,
                       m.BUrl,
                       m.BTitle,
                       m.Active,
                       m.Priority,
                       Submenu = db.BCKeywordTbls.Where(s => s.BannerCateId == m.BannerCateId && s.Active == true).Select(s => new
                       {
                           s.BannerCateId,
                           s.KeywordId,
                           s.BCkeywordId,

                           SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId).Select(t => t.Keyword).FirstOrDefault()
                       })
                   }).OrderBy(m => m.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SubmitBannerCate(BannerCateTbl model, List<KeywordTbl> keywordsTbl)
        {
            try
            {

                model.BannerCateId = db.BannerCateTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.BannerCateId) + 1;


                model.BTitle = model.BTitle;
                model.BUrl = model.BTitle.Replace(" ", "-");
                model.Create_at = DateTime.Now;
                model.Update_at = DateTime.Now;
                model.Active = true;
                model.Priority = model.Priority;
                db.BannerCateTbls.Add(model);
                db.SaveChanges();

                if (keywordsTbl != null)
                {

                    for (int i = 0; i < keywordsTbl.Count; i++)
                    {
                        BCKeywordTbl BCKeyword = new BCKeywordTbl();
                        BCKeyword.BCkeywordId = db.BCKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.BCkeywordId) + 1;
                        BCKeyword.BannerCateId = model.BannerCateId;

                        BCKeyword.KeywordId = keywordsTbl[i].KeywordId;
                        BCKeyword.Active = true;
                        db.BCKeywordTbls.Add(BCKeyword);
                        db.SaveChanges();

                    }
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

        public JsonResult UpdateBannerCate(BannerCateTbl model, List<KeywordTbl> keywordsTbl)
        {
            try
            {
                var result = db.BannerCateTbls.FirstOrDefault(p => p.BannerCateId == model.BannerCateId);
                if (result != null)
                {
                    result.BTitle = model.BTitle;
                    result.BUrl = model.BTitle.Replace(" ", "-");
                    result.Priority = model.Priority;
                    db.SaveChanges();

                    var totoid = db.BCKeywordTbls.Where(p => p.BannerCateId == model.BannerCateId);
                    db.BCKeywordTbls.RemoveRange(totoid);
                    db.SaveChanges();
                    if (keywordsTbl != null)
                    {

                        for (int i = 0; i < keywordsTbl.Count; i++)
                        {
                            BCKeywordTbl BCKeyword = new BCKeywordTbl();
                            BCKeyword.BCkeywordId = db.BCKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.BCkeywordId) + 1;
                            BCKeyword.BannerCateId = model.BannerCateId;

                            BCKeyword.KeywordId = keywordsTbl[i].KeywordId;
                            BCKeyword.Active = true;
                            db.BCKeywordTbls.Add(BCKeyword);
                            db.SaveChanges();

                        }
                    }

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

        public JsonResult BannerActiveDeActive(int id)
        {
            try
            {
                var jb = db.BannerCateTbls.Where(c => c.BannerCateId == id).FirstOrDefault();
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

        public JsonResult SubmitBannerCateProduct(List<ProductTblmodel> BannerCateProductArrData, int BannerCateId)
        {
            try
            {

                var totoid = db.BannerCateProductTbls.Where(p => p.BannerCateId == BannerCateId);
                db.BannerCateProductTbls.RemoveRange(totoid);
                db.SaveChanges();
                if (BannerCateProductArrData != null)
                {

                    for (int i = 0; i < BannerCateProductArrData.Count; i++)
                    {
                        BannerCateProductTbl banner = new BannerCateProductTbl();
                        banner.BCProductId = db.BannerCateProductTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.BCProductId) + 1;
                        banner.BannerCateId = BannerCateId;

                        banner.ProductId = BannerCateProductArrData[i].ProductId;

                        db.BannerCateProductTbls.Add(banner);
                        db.SaveChanges();

                    }
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



        public JsonResult GetBannerCateProductByid(int id)
        {
            try
            {


                var res = db.BannerCateProductTbls.Where(c => c.BannerCateId == id);
                return Json(res, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }

        }

        //--------------Banner Product->------------->---------------------->---------------------------->------->------------>---------->---

        public JsonResult SubmitBannerProdcutT(MainCateTblModel model)
        {
            try
            {
                var result = db.MainCateTbls.Where(p => p.Position == model.Position && p.Position != "Multiple Banner").Count();

                if (model.Position == "Small Banner" && result > 3)
                {

                    var res1 = new { res = "0", Position = "Small Banner" };
                    return Json(res1, JsonRequestBehavior.AllowGet);

                }
                else if (model.Position == "Design Banner" && result > 4)
                {
                    var res1 = new { res = "0", Position = "Design Banner" };
                    return Json(res1, JsonRequestBehavior.AllowGet);

                }

                MainCateTbl mainCateTbl = new MainCateTbl();
                mainCateTbl.MainCateId = db.MainCateTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.MainCateId) + 1;


                mainCateTbl.MTitle = model.MTitle;
                mainCateTbl.MUrl = model.MTitle.Replace(" ", "-");
                if (model.Image != null)
                {
                    string extensionstuimg = Path.GetExtension(model.Image.FileName);
                    model.Image.SaveAs(Server.MapPath("~/images/MainCate/" + mainCateTbl.MainCateId + "" + extensionstuimg));
                    //   MainCateVaryQualityLevel(model.Image.InputStream, mainCateTbl.MainCateId + extensionstuimg);
                    mainCateTbl.MImage = mainCateTbl.MainCateId + "" + extensionstuimg;
                }
                mainCateTbl.Create_at = DateTime.Now;
                mainCateTbl.Position = model.Position;
                mainCateTbl.ModelQuery1 = model.ModelQuery1;
                mainCateTbl.Update_at = DateTime.Now;
                mainCateTbl.Active = true;
                mainCateTbl.MainCateType = "";
                mainCateTbl.CateType = "BannerCate";
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


        public JsonResult BannerProdcutTKeywordArray(MainCateTblModel model)
        {

            try
            {

                BannerPTTbl result = db.BannerPTTbls.Where(c => c.MainCateId == model.MainCateId).FirstOrDefault();

                if (result == null)
                {
                    var res1 = new { res = "0" };
                    return Json(res1, JsonRequestBehavior.AllowGet);
                }


                if (model.keywordTbls != null)
                {

                    for (int i = 0; i < model.keywordTbls.Count; i++)
                    {
                        BPTKeywordTbl mCKeyword = new BPTKeywordTbl();
                        mCKeyword.MCkeywordId = db.BPTKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.MCkeywordId) + 1;
                        mCKeyword.MainCateId = model.MainCateId;

                        mCKeyword.KeywordId = model.keywordTbls[i].KeywordId;
                        mCKeyword.Active = true;
                        db.BPTKeywordTbls.Add(mCKeyword);
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



        public JsonResult UpdateBannerProdcutT(MainCateTblModel model)
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
                    result.Position = model.Position;
                    result.ModelQuery1 = model.ModelQuery1;
                    result.MainCateType = "";
                    result.CateType = "BannerCate";
                    result.MUrl = result.MTitle.Replace(" ", "-");
                    result.Priority = model.Priority;
                    result.Update_at = DateTime.Now;
                    db.SaveChanges();

                }
                var res = new { res = "1", MainCateId = result.MainCateId };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult UpdateBannerProdcutTKeywordArray(MainCateTblModel model)
        {

            try
            {

                BannerPTTbl result = db.BannerPTTbls.Where(c => c.MainCateId == model.MainCateId).FirstOrDefault();

                if (result == null)
                {
                    var res1 = new { res = "0" };
                    return Json(res1, JsonRequestBehavior.AllowGet);
                }


                var totoid = db.BPTKeywordTbls.Where(p => p.MainCateId == model.MainCateId);
                db.BPTKeywordTbls.RemoveRange(totoid);
                db.SaveChanges();
                if (model.keywordTbls != null)
                {

                    for (int i = 0; i < model.keywordTbls.Count; i++)
                    {
                        BPTKeywordTbl mCKeyword = new BPTKeywordTbl();
                        mCKeyword.MCkeywordId = db.BPTKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.MCkeywordId) + 1;
                        mCKeyword.MainCateId = model.MainCateId;
                        mCKeyword.KeywordId = model.keywordTbls[i].KeywordId;

                        mCKeyword.Active = true;
                        db.BPTKeywordTbls.Add(mCKeyword);
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

        public JsonResult BannerProdcutTActiveDeActive(int id)
        {
            try
            {
                var jb = db.BannerPTTbls.Where(c => c.MainCateId == id).FirstOrDefault();
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

        public JsonResult GetBannerProdcutT()
        {
            var res =

               db.MainCateTbls.Where(m => m.CateType == "BannerCate").Select(m => new
               {
                   m.MainCateId,
                   m.MUrl,
                   m.MTitle,
                   m.Active,
                   m.MImage,
                   m.Position,
                   m.ModelQuery1,
                   m.Priority,
                   Submenu = db.BPTKeywordTbls.Where(s => s.MainCateId == m.MainCateId && s.Active == true).Select(s => new
                   {
                       s.MainCateId,
                       s.KeywordId,
                       s.MCkeywordId,
                       SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId).Select(t => t.Keyword).FirstOrDefault()
                   })
               }).OrderBy(m => m.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        //--------------Banner Product End->------------->---------------------->---------------------------->------->------------>---------->---

        //-------------- Add Banner in Product->------------->---------------------->---------------------------->------->------------>---------->---

        public JsonResult GetBannerInProduct(string id)
        {
            var res =

               db.BannerPTTbls.Where(m => m.Position == id && m.Active == true).Select(m => new
               {
                   m.MainCateId,
                   m.MUrl,
                   m.MTitle,
                   m.Active,
                   m.MImage,
                   m.Position,
                   m.Priority,
                   Submenu = db.BPTKeywordTbls.Where(s => s.MainCateId == m.MainCateId && s.Active == true).Select(s => new
                   {
                       s.MainCateId,
                       s.KeywordId,
                       s.MCkeywordId,
                       SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId).Select(t => t.Keyword).FirstOrDefault()
                   })
               }).OrderBy(m => m.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetBannerInProductFilter()
        {
            var res =

               db.BannerPTTbls.Where(m => m.Active == true).Select(m => new
               {
                   m.MainCateId,
                   m.MUrl,
                   m.MTitle,
                   m.Active,
                   m.MImage,
                   m.Position,
                   m.Priority,
               }).OrderBy(m => m.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetBannerPInKeyword(int MainCateId)
        {
            var res = db.BPTKeywordTbls.Where(k => k.MainCateId == MainCateId && k.Active == true).Select(k => new
            {
                k.MainCateId,
                k.Active,
                k.KeywordId,
                Keyword = db.KeywordTbls.Where(p => p.KeywordId == k.KeywordId).Select(m => m.Keyword).FirstOrDefault(),
            });
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetSubTitleList(int id)
        {
            var res = db.BSubTitleDetailTbls.Where(k => k.QueryId == id).Select(k => new
            {
                k.MainCateId,
                k.kSubTitle,
                k.BSubDId,
                Keywordlist = db.BPTKeywordTbls.Where(s => s.BSubDId == k.BSubDId && s.Active == true).Select(s => new
                {
                    s.MainCateId,
                    s.KeywordId,
                    s.MCkeywordId,
                    SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                }),
            });
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        private void BannerProductVaryQualityLevel(Stream stream, string fname)
        {
            //  size 
            System.Drawing.Image photo = new Bitmap(stream);
            //Bitmap bmp1 = new Bitmap(photo, 119, 83);

            Bitmap bmp1 = new Bitmap(photo, 550, 550);
            // without size
            //  Bitmap bmp1 = new Bitmap(stream);
            ImageCodecInfo jgpEncoder = GetEncoder(ImageFormat.Jpeg);
            System.Drawing.Imaging.Encoder myEncoder = System.Drawing.Imaging.Encoder.Quality;
            EncoderParameters myEncoderParameters = new EncoderParameters(1);
            EncoderParameter myEncoderParameter = new EncoderParameter(myEncoder, 30L);
            myEncoderParameters.Param[0] = myEncoderParameter;
            bmp1.Save(Server.MapPath("~/images/ProductImg/" + fname), jgpEncoder, myEncoderParameters);
            bmp1.Dispose();

        }

        public JsonResult SubmitBannerProduct(ProductTblmodel model)
        {

            try
            {
                BannerProductTbl productmodel = new BannerProductTbl();

                BannerProductTbl result = db.BannerProductTbls.Where(c => c.ProductTitle == model.ProductTitle).FirstOrDefault();
                if (result != null)
                {
                    var res = new { res = "-1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    productmodel.ProductId = db.BannerProductTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.ProductId) + 1;

                    productmodel.MainCateId = model.MainCateId;
                    productmodel.QueryId = model.QueryId;
                    productmodel.BSubId = db.BSubTitleDetailTbls.Where(q => q.BSubDId == model.BSubDId).Select(q => q.BSubId).FirstOrDefault();
                    productmodel.BSubDId = model.BSubDId;

                    productmodel.ProductTitle = model.ProductTitle;
                    productmodel.Active = true;
                    productmodel.VideoUrl = model.VideoUrl ?? "";
                    productmodel.SameDay = model.SameDay;
                    productmodel.PUrl = model.ProductTitle.Replace(" ", "-");
                    productmodel.PDesc = model.PDesc;
                    productmodel.PLabel = model.PLabel == null ? "" : model.PLabel;
                    productmodel.Price = model.Price;
                    productmodel.Qty = 1;
                    if (model.VideoData != null)
                    {
                        string extensionstuimg = Path.GetExtension(model.VideoData.FileName);
                        model.VideoData.SaveAs(Server.MapPath("~/images/ProductVideo/" + "B_" + productmodel.ProductId + extensionstuimg));
                        productmodel.Video = "B_" + productmodel.ProductId + extensionstuimg;

                    }

                    productmodel.Create_at = DateTime.Now;
                    productmodel.Update_at = DateTime.Now;
                    productmodel.Priority = model.Priority;
                    db.BannerProductTbls.Add(productmodel);
                    db.SaveChanges();


                    if (model.Image1 != null)
                    {
                        BannerProductImage productImage = new BannerProductImage();
                        productImage.PImageId = db.BannerProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                        string extensionstuimg = Path.GetExtension(model.Image1.FileName);
                        model.Image1.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + productImage.PImageId + extensionstuimg));
                        // ProductVaryQualityLevel(model.Image1.InputStream, productImage.PImageId + extensionstuimg);
                        productImage.PImage = "B_" + productImage.PImageId + extensionstuimg;
                        productImage.ProductId = productmodel.ProductId;
                        productImage.Active = true;
                        db.BannerProductImages.Add(productImage);
                        db.SaveChanges();
                    }
                    if (model.Image2 != null)
                    {
                        BannerProductImage productImage = new BannerProductImage();
                        productImage.PImageId = db.BannerProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                        string extensionstuimg = Path.GetExtension(model.Image2.FileName);
                        //  VaryQualityLevel(model.Image1.InputStream, productImage.PImageId + extensionstuimg);
                        model.Image2.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + productImage.PImageId + extensionstuimg));
                        //ProductVaryQualityLevel(model.Image2.InputStream, productImage.PImageId + extensionstuimg);
                        productImage.PImage = "B_" + productImage.PImageId + extensionstuimg;
                        productImage.ProductId = productmodel.ProductId;
                        productImage.Active = true;
                        db.BannerProductImages.Add(productImage);
                        db.SaveChanges();
                    }
                    if (model.Image3 != null)
                    {
                        BannerProductImage productImage = new BannerProductImage();

                        productImage.PImageId = db.BannerProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                        string extensionstuimg = Path.GetExtension(model.Image3.FileName);
                        model.Image3.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + productImage.PImageId + extensionstuimg));
                        //ProductVaryQualityLevel(model.Image3.InputStream, productImage.PImageId + extensionstuimg);
                        productImage.PImage = "B_" + productImage.PImageId + extensionstuimg;
                        productImage.ProductId = productmodel.ProductId;
                        productImage.Active = true;
                        db.BannerProductImages.Add(productImage);
                        db.SaveChanges();
                    }
                    if (model.Image4 != null)
                    {
                        BannerProductImage productImage = new BannerProductImage();

                        productImage.PImageId = db.BannerProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                        string extensionstuimg = Path.GetExtension(model.Image4.FileName);
                        model.Image4.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + productImage.PImageId + extensionstuimg));
                        //ProductVaryQualityLevel(model.Image4.InputStream, productImage.PImageId + extensionstuimg);
                        productImage.PImage = "B_" + productImage.PImageId + extensionstuimg;
                        productImage.ProductId = productmodel.ProductId;
                        productImage.Active = true;
                        db.BannerProductImages.Add(productImage);
                        db.SaveChanges();
                    }
                    if (model.Image5 != null)
                    {
                        BannerProductImage productImage = new BannerProductImage();
                        productImage.PImageId = db.BannerProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                        string extensionstuimg = Path.GetExtension(model.Image5.FileName);
                        model.Image5.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + productImage.PImageId + extensionstuimg));
                        //ProductVaryQualityLevel(model.Image5.InputStream, productImage.PImageId + extensionstuimg);
                        productImage.PImage = "B_" + productImage.PImageId + extensionstuimg;
                        productImage.ProductId = productmodel.ProductId;
                        productImage.Active = true;
                        db.BannerProductImages.Add(productImage);
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


        public JsonResult BannerProductArrayData(ProductTblmodel model, List<ProductDetailTbl> productDataArray)
        {

            try
            {

                BannerProductTbl result = db.BannerProductTbls.Where(c => c.ProductId == model.ProductId).FirstOrDefault();

                if (result != null)
                {

                    result.PDesc1 = model.PDesc1;
                    db.SaveChanges();
                }


                if (model.bannerQueryListTbls != null)
                {
                    for (int i = 0; i < model.bannerQueryListTbls.Count; i++)
                    {
                        BannerQueryListTbl pKeyword = new BannerQueryListTbl();
                        pKeyword.BannerQueryListId = db.BannerQueryListTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.BannerQueryListId) + 1;
                        pKeyword.BMainCateId = Convert.ToInt32(result.MainCateId);
                        pKeyword.ProductId = result.ProductId;
                        pKeyword.QueryId = model.bannerQueryListTbls[i].QueryId;
                        db.BannerQueryListTbls.Add(pKeyword);
                        db.SaveChanges();

                    }
                }

                //if (model.KeywordTbls != null)
                //{
                //    for (int i = 0; i < model.KeywordTbls.Count; i++)
                //    {
                //        BPKeywordTbl pKeyword = new BPKeywordTbl();
                //        pKeyword.PKeywordId = db.BPKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.PKeywordId) + 1;
                //        pKeyword.ProductId = model.ProductId;
                //        pKeyword.Active = true;
                //        pKeyword.KeywordId = model.KeywordTbls[i].KeywordId;
                //        db.BPKeywordTbls.Add(pKeyword);
                //        db.SaveChanges();

                //    }
                //}

                if (model.BPSizeTbl != null)
                {
                    for (int i = 0; i < model.BPSizeTbl.Count; i++)
                    {
                        BPSizeTbl pSizeTbl = new BPSizeTbl();
                        pSizeTbl.BPSizeId = db.BPSizeTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.BPSizeId) + 1;
                        pSizeTbl.ProductId = model.ProductId;
                        pSizeTbl.Active = true;
                        pSizeTbl.SizeId = model.BPSizeTbl[i].SizeId;
                        db.BPSizeTbls.Add(pSizeTbl);
                        db.SaveChanges();

                    }
                }
                for (int i = 0; i < productDataArray.Count; i++)
                {
                    ProductDetailTbl productDetail = new ProductDetailTbl();
                    productDetail.PdId = db.ProductDetailTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.PdId) + 1;
                    productDetail.ProductId = result.ProductId;
                    productDetail.SizeId = productDataArray[i].SizeId;
                    productDetail.Price = productDataArray[i].Price;
                    productDetail.ProductType = "BannerProduct";
                    productDetail.Priority = productDataArray[i].Priority;
                    productDetail.Active = true;
                    db.ProductDetailTbls.Add(productDetail);
                    db.SaveChanges();
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

        public JsonResult BannerProductActiveDeActive(int id)
        {
            try
            {
                var jb = db.BannerProductTbls.Where(c => c.ProductId == id).FirstOrDefault();
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

        public JsonResult BannerUpdateProductData(ProductTblmodel model)
        {
            try
            {

                BannerProductTbl result = db.BannerProductTbls.Where(c => c.ProductId == model.ProductId).FirstOrDefault();
                if (result != null)
                {


                    result.MainCateId = model.MainCateId;
                    result.QueryId = model.QueryId;
                    result.BSubId = db.BSubTitleDetailTbls.Where(q => q.BSubDId == model.BSubDId).Select(q => q.BSubId).FirstOrDefault();
                    result.BSubDId = model.BSubDId;
                    result.ProductTitle = model.ProductTitle;
                    result.VideoUrl = model.VideoUrl ?? "";
                    result.SameDay = model.SameDay;
                    result.PDesc = model.PDesc;
                    result.PUrl = model.ProductTitle.Replace(" ", "-");
                    if (model.VideoData != null)
                    {
                        string extensionstuimg = Path.GetExtension(model.VideoData.FileName);
                        model.VideoData.SaveAs(Server.MapPath("~/images/ProductVideo/" + "B_" + result.ProductId + extensionstuimg));
                        result.Video = "B_" + result.ProductId + extensionstuimg;
                    }
                    result.PLabel = model.PLabel == null ? "" : model.PLabel;
                    result.Price = model.Price;
                    result.Update_at = DateTime.Now;
                    result.Priority = model.Priority;
                    db.SaveChanges();

                    if (model.Image1 != null)
                    {
                        List<BannerProductImage> productImage = db.BannerProductImages.Where(c => c.ProductId == result.ProductId).ToList();

                        if (productImage != null && productImage.Count != 0)
                        {
                            var Pimageid = productImage[0].PImageId;
                            BannerProductImage pimagearr = db.BannerProductImages.Where(c => c.PImageId == Pimageid).FirstOrDefault();
                            string extensionstuimg = Path.GetExtension(model.Image1.FileName);

                            model.Image1.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + pimagearr.PImageId + extensionstuimg));
                            //ProductVaryQualityLevel(model.Image1.InputStream, Pimageid + extensionstuimg);
                            pimagearr.PImage = "B_" + pimagearr.PImageId + extensionstuimg;
                            db.SaveChanges();
                        }
                        else
                        {
                            BannerProductImage productImage1 = new BannerProductImage();
                            productImage1.PImageId = db.BannerProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                            string extensionstuimg = Path.GetExtension(model.Image1.FileName);
                            model.Image1.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + productImage1.PImageId + extensionstuimg));
                            //ProductVaryQualityLevel(model.Image1.InputStream, productImage1.PImageId + extensionstuimg);
                            productImage1.PImage = "B_" + productImage1.PImageId + extensionstuimg;
                            productImage1.ProductId = result.ProductId;
                            productImage1.Active = true;
                            db.BannerProductImages.Add(productImage1);
                            db.SaveChanges();
                        }

                    }


                    if (model.Image2 != null)
                    {
                        List<BannerProductImage> productImage = db.BannerProductImages.Where(c => c.ProductId == result.ProductId).ToList();

                        if (productImage != null)
                        {
                            var Pimageid = productImage[1].PImageId;
                            ProductImage pimagearr = db.ProductImages.Where(c => c.PImageId == Pimageid).FirstOrDefault();
                            string extensionstuimg = Path.GetExtension(model.Image2.FileName);
                            model.Image2.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + pimagearr.PImageId + extensionstuimg));
                            //ProductVaryQualityLevel(model.Image2.InputStream, Pimageid + extensionstuimg);
                            pimagearr.PImage = "B_" + pimagearr.PImageId + extensionstuimg;
                            db.SaveChanges();
                        }
                        else
                        {
                            BannerProductImage productImage1 = new BannerProductImage();
                            productImage1.PImageId = db.BannerProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                            string extensionstuimg = Path.GetExtension(model.Image2.FileName);
                            model.Image2.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + productImage1.PImageId + extensionstuimg));
                            //ProductVaryQualityLevel(model.Image2.InputStream, productImage1.PImageId + extensionstuimg);
                            productImage1.PImage = "B_" + productImage1.PImageId + extensionstuimg;
                            productImage1.ProductId = result.ProductId;
                            productImage1.Active = true;
                            db.BannerProductImages.Add(productImage1);
                            db.SaveChanges();
                        }

                    }
                    if (model.Image3 != null)
                    {
                        List<BannerProductImage> productImage = db.BannerProductImages.Where(c => c.ProductId == result.ProductId).ToList();

                        if (productImage != null)
                        {
                            var Pimageid = productImage[2].PImageId;
                            BannerProductImage pimagearr = db.BannerProductImages.Where(c => c.PImageId == Pimageid).FirstOrDefault();
                            string extensionstuimg = Path.GetExtension(model.Image3.FileName);
                            model.Image3.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + pimagearr.PImageId + extensionstuimg));
                            //ProductVaryQualityLevel(model.Image3.InputStream, pimagearr.PImageId + extensionstuimg);
                            pimagearr.PImage = "B_" + pimagearr.PImageId + extensionstuimg;
                            db.SaveChanges();
                        }
                        else
                        {
                            BannerProductImage productImage1 = new BannerProductImage();
                            productImage1.PImageId = db.BannerProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                            string extensionstuimg = Path.GetExtension(model.Image3.FileName);
                            model.Image3.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + productImage1.PImageId + extensionstuimg));
                            //ProductVaryQualityLevel(model.Image3.InputStream, productImage1.PImageId + extensionstuimg);
                            productImage1.PImage = "B_" + productImage1.PImageId + extensionstuimg;
                            productImage1.ProductId = result.ProductId;
                            productImage1.Active = true;
                            db.BannerProductImages.Add(productImage1);
                            db.SaveChanges();
                        }

                    }
                    if (model.Image4 != null)
                    {
                        List<BannerProductImage> productImage = db.BannerProductImages.Where(c => c.ProductId == result.ProductId).ToList();

                        if (productImage != null)
                        {
                            var Pimageid = productImage[3].PImageId;
                            BannerProductImage pimagearr = db.BannerProductImages.Where(c => c.PImageId == Pimageid).FirstOrDefault();
                            string extensionstuimg = Path.GetExtension(model.Image4.FileName);
                            model.Image4.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + pimagearr.PImageId + extensionstuimg));
                            //ProductVaryQualityLevel(model.Image1.InputStream, pimagearr.PImageId + extensionstuimg);
                            pimagearr.PImage = "B_" + pimagearr.PImageId + extensionstuimg;
                            db.SaveChanges();
                        }
                        else
                        {
                            BannerProductImage productImage1 = new BannerProductImage();
                            productImage1.PImageId = db.BannerProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                            string extensionstuimg = Path.GetExtension(model.Image4.FileName);
                            model.Image4.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + productImage1.PImageId + extensionstuimg));
                            //ProductVaryQualityLevel(model.Image1.InputStream, productImage1.PImageId + extensionstuimg);
                            productImage1.PImage = "B_" + productImage1.PImageId + extensionstuimg;
                            productImage1.ProductId = result.ProductId;
                            productImage1.Active = true;
                            db.BannerProductImages.Add(productImage1);
                            db.SaveChanges();
                        }

                    }
                    if (model.Image5 != null)
                    {
                        List<BannerProductImage> productImage = db.BannerProductImages.Where(c => c.ProductId == result.ProductId).ToList();

                        if (productImage != null)
                        {
                            var Pimageid = productImage[4].PImageId;
                            BannerProductImage pimagearr = db.BannerProductImages.Where(c => c.PImageId == Pimageid).FirstOrDefault();
                            string extensionstuimg = Path.GetExtension(model.Image5.FileName);
                            model.Image5.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + pimagearr.PImageId + extensionstuimg));
                            //ProductVaryQualityLevel(model.Image1.InputStream, pimagearr.PImageId + extensionstuimg);
                            pimagearr.PImage = "B_" + pimagearr.PImageId + extensionstuimg;
                            db.SaveChanges();
                        }
                        else
                        {
                            BannerProductImage productImage1 = new BannerProductImage();
                            productImage1.PImageId = db.BannerProductImages.DefaultIfEmpty().Max(r => r == null ? 0 : r.PImageId) + 1;
                            string extensionstuimg = Path.GetExtension(model.Image5.FileName);
                            model.Image5.SaveAs(Server.MapPath("~/images/ProductImg/" + "B_" + productImage1.PImageId + extensionstuimg));
                            //ProductVaryQualityLevel(model.Image1.InputStream, productImage1.PImageId + extensionstuimg);
                            productImage1.PImage = "B_" + productImage1.PImageId + extensionstuimg;
                            productImage1.ProductId = result.ProductId;
                            productImage1.Active = true;
                            db.BannerProductImages.Add(productImage1);
                            db.SaveChanges();
                        }

                    }


                }
                var res = new { res = "1", ProductId = result.ProductId };
                return Json(res, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                var md = ex.Message;
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult BannerUpdateProductArrayData(ProductTblmodel model, List<ProductDetailTbl> productDataArray)
        {
            try
            {
                BannerProductTbl result = db.BannerProductTbls.Where(c => c.ProductId == model.ProductId).FirstOrDefault();
                if (result != null)
                {
                    result.PDesc1 = model.PDesc1;

                    db.SaveChanges();
                    var totoid = db.BannerQueryListTbls.Where(p => p.ProductId == model.ProductId);
                    db.BannerQueryListTbls.RemoveRange(totoid);
                    db.SaveChanges();
                    if (model.bannerQueryListTbls != null)
                    {
                        for (int i = 0; i < model.bannerQueryListTbls.Count; i++)
                        {
                            BannerQueryListTbl pKeyword = new BannerQueryListTbl();
                            pKeyword.BannerQueryListId = db.BannerQueryListTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.BannerQueryListId) + 1;
                            pKeyword.BMainCateId = Convert.ToInt32(result.MainCateId);
                            pKeyword.ProductId = result.ProductId;
                            pKeyword.QueryId = model.bannerQueryListTbls[i].QueryId;
                            db.BannerQueryListTbls.Add(pKeyword);
                            db.SaveChanges();

                        }
                    }
                    //var totoid = db.BPKeywordTbls.Where(p => p.ProductId == model.ProductId);
                    //db.BPKeywordTbls.RemoveRange(totoid);
                    //db.SaveChanges();
                    //if (model.KeywordTbls != null)
                    //{
                    //    for (int i = 0; i < model.KeywordTbls.Count; i++)
                    //    {
                    //        BPKeywordTbl pKeyword = new BPKeywordTbl();
                    //        pKeyword.PKeywordId = db.BPKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.PKeywordId) + 1;
                    //        pKeyword.ProductId = model.ProductId;
                    //        pKeyword.Active = true;
                    //        pKeyword.KeywordId = model.KeywordTbls[i].KeywordId;
                    //        db.BPKeywordTbls.Add(pKeyword);
                    //        db.SaveChanges();

                    //    }
                    //}

                    var Sizeid = db.BPSizeTbls.Where(p => p.ProductId == model.ProductId);
                    db.BPSizeTbls.RemoveRange(Sizeid);
                    db.SaveChanges();
                    if (model.BPSizeTbl != null)
                    {
                        for (int i = 0; i < model.BPSizeTbl.Count; i++)
                        {
                            BPSizeTbl pSizeTbl = new BPSizeTbl();
                            pSizeTbl.BPSizeId = db.BPSizeTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.BPSizeId) + 1;
                            pSizeTbl.ProductId = model.ProductId;
                            pSizeTbl.Active = true;
                            pSizeTbl.SizeId = model.BPSizeTbl[i].SizeId;
                            db.BPSizeTbls.Add(pSizeTbl);
                            db.SaveChanges();

                        }
                    }
                    // Remove ProductDetail_Tbl records for the given PId
                    var RemoveProductDetail = db.ProductDetailTbls.Where(r => r.ProductId == model.ProductId);
                    db.ProductDetailTbls.RemoveRange(RemoveProductDetail);
                    db.SaveChanges();

                    for (int i = 0; i < productDataArray.Count; i++)
                    {

                        if (productDataArray[i].SizeId != -1)
                        {

                            ProductDetailTbl productDetail = new ProductDetailTbl();
                            productDetail.PdId = db.ProductDetailTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.PdId) + 1;
                            productDetail.ProductId = result.ProductId;
                            productDetail.ProductType = "BannerProduct";
                            productDetail.SizeId = productDataArray[i].SizeId;
                            productDetail.Price = productDataArray[i].Price;
                            productDetail.Priority = productDataArray[i].Priority;
                            productDetail.Active = true;
                            db.ProductDetailTbls.Add(productDetail);
                            db.SaveChanges();
                        }

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

        public JsonResult GetBannerProduct(int id)
        {
            var res =

               db.BannerProductTbls.Where(m => id == -2 ? true : m.MainCateId == id && m.Active == true).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Price,
                   m.PUrl,
                   m.Active,
                   m.PDesc,
                   m.SameDay,
                   m.VideoUrl,
                   m.PDesc1,
                   m.Priority,
                   ProductImage = db.BannerProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage),
                   Maincate = db.BannerPTTbls.Where(p => p.MainCateId == m.MainCateId).FirstOrDefault(),
                   Submenu = db.BannerQueryListTbls.Where(s => s.ProductId == m.ProductId).Select(s => new
                   {
                       s.ProductId,
                       s.QueryId,
                       s.BannerQueryListId,
                       SubmenuTitle = db.QueryTbls.Where(t => t.QId == s.QueryId && t.Active == true).Select(t => t.Answer).FirstOrDefault()
                   }),
                   //Submenu = db.BPKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   //{
                   //    s.ProductId,
                   //    s.KeywordId,
                   //    s.PKeywordId,
                   //    SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                   //}),
                   PSizeList = db.BPSizeTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   {
                       s.ProductId,
                       s.SizeId,
                       s.BPSizeId,
                       SizeTitle = db.SizeTbls.Where(t => t.SizeId == s.SizeId && t.Active == true).Select(t => t.SizeTitle).FirstOrDefault()
                   }),
                   productDataArray = db.ProductDetailTbls.Where(p => p.ProductId == m.ProductId).Select(p => new
                   {
                       p.ProductId,
                       p.Price,
                       p.SizeId,
                       p.SizeName,
                       ProductSize = db.SizeTbls.Where(s => s.SizeId == p.SizeId).OrderByDescending(s => s.SizeTitle).Select(s => s.SizeTitle).FirstOrDefault(),
                   })
               });
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        //-------------- Add Banner in Product End->------------->---------------------->---------------------------->------->------------>---------->---


        //-------------- Submit Banner Sub Cate Title Start ->------------->---------------------->---------------------------->------->------------>---------->---

        public partial class BSubTitleTblmodel
        {
            public long BSubId { get; set; }
            public Nullable<long> MainCateId { get; set; }
            public string SubTitle { get; set; }
            public Nullable<long> Priority { get; set; }
            public Nullable<bool> Active { get; set; }
            public Nullable<System.DateTime> Create_at { get; set; }
            public Nullable<System.DateTime> Update_at { get; set; }
            public Nullable<int> QueryId { get; set; }
            public string KeywordTitle { get; set; }
            public string AskQues2 { get; set; }



        }
        public JsonResult SubmitBannerSubCateTitle(BSubTitleTblmodel model)
        {
            try
            {
                var result = db.BSubTitleTbls.Where(p => p.KeywordTitle == model.KeywordTitle).FirstOrDefault();

                //if (result != null)
                //{

                //    var res1 = new { res = "2" };
                //    return Json(res1, JsonRequestBehavior.AllowGet);

                //}

                BSubTitleTbl mainCateTbl = new BSubTitleTbl();
                mainCateTbl.BSubId = db.BSubTitleTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.BSubId) + 1;
                mainCateTbl.MainCateId = model.MainCateId;
                mainCateTbl.QueryId = model.QueryId;
                mainCateTbl.AskQues2 = model.AskQues2;
                mainCateTbl.KeywordTitle = model.KeywordTitle;
                mainCateTbl.Create_at = DateTime.Now;
                mainCateTbl.Update_at = DateTime.Now;
                mainCateTbl.Active = true;
                mainCateTbl.Priority = model.Priority;
                db.BSubTitleTbls.Add(mainCateTbl);
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


        public JsonResult GetBannerSubCateTitle()
        {
            var res =

               db.BSubTitleTbls.Select(m => new
               {
                   m.MainCateId,
                   m.SubTitle,
                   m.BSubId,
                   m.AskQues2,
                   m.QueryId,
                   m.KeywordTitle,
                   QueryTitle = db.QueryTbls.Where(q => q.QId == m.QueryId).FirstOrDefault(),
                   bMainTitle = db.BannerPTTbls.Where(b => b.MainCateId == m.MainCateId).FirstOrDefault(),
                   m.Active,
                   m.Priority,

               }); ; ;
            return Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetBannerToQuery(int id)
        {
            var res = db.QueryTbls.Where(m => m.MainCateId == id && m.Active == true).ToList();
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult UpdateBannerSubCateTitle(BSubTitleTblmodel model)
        {
            try
            {
                var result = db.BSubTitleTbls.FirstOrDefault(p => p.BSubId == model.BSubId);
                if (result != null)
                {

                    result.SubTitle = model.SubTitle;
                    result.MainCateId = model.MainCateId;
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

        public JsonResult BannerSubTitleActiveDeActive(int id)
        {
            try
            {
                var jb = db.BSubTitleTbls.Where(c => c.BSubId == id).FirstOrDefault();
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


        //-------------- Submit Banner Sub Cate Title End ->------------->---------------------->---------------------------->------->------------>---------->---


        //-------------- Submit Query model Start ->------------->---------------------->---------------------------->------->------------>---------->---


        public class QueryTblmodel
        {
            public int QId { get; set; }
            public Nullable<int> MainCateId { get; set; }
            public string AskQues1 { get; set; }
            public string Answer { get; set; }
            public Nullable<bool> Priority { get; set; }
            public Nullable<bool> Active { get; set; }
            public Nullable<bool> ModelQuery2 { get; set; }
            public Nullable<System.DateTime> Create_at { get; set; }
            public Nullable<System.DateTime> Update_at { get; set; }

            public List<AnswerArr> AnswerArrs { get; set; }
        }

        public class AnswerArr
        {
            public int QId { get; set; }

            public string Answer { get; set; }

        }

        public JsonResult SubmitQuerymodel(QueryTblmodel query, List<AnswerArr> answerArrs)
        {
            try
            {
                var result = db.QueryTbls.Where(p => p.AskQues1 == query.AskQues1).FirstOrDefault();

                if (result != null)
                {

                    var res1 = new { res = "2" };
                    return Json(res1, JsonRequestBehavior.AllowGet);

                }

                for (int i = 0; i < answerArrs.Count; i++)
                {

                    QueryTbl queryTbl = new QueryTbl();
                    queryTbl.QId = db.QueryTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.QId) + 1;
                    queryTbl.MainCateId = query.MainCateId;
                    queryTbl.AskQues1 = query.AskQues1;
                    queryTbl.Answer = answerArrs[i].Answer;
                    queryTbl.ModelQuery2 = query.ModelQuery2;
                    queryTbl.Create_at = DateTime.Now;
                    queryTbl.Update_at = DateTime.Now;
                    queryTbl.Active = true;
                    queryTbl.Priority = query.Priority;
                    db.QueryTbls.Add(queryTbl);
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

        public JsonResult GetQuerymodel()
        {
            var res =

               db.QueryTbls.Select(m => new
               {
                   m.MainCateId,
                   m.AskQues1,
                   m.QId,
                   m.ModelQuery2,
                   m.Answer,
                   bMainTitle = db.BannerPTTbls.Where(b => b.MainCateId == m.MainCateId).FirstOrDefault(),
                   m.Active,
                   m.Priority,

               });
            return Json(res, JsonRequestBehavior.AllowGet);

        }


        public JsonResult UpdateQuerymodel(QueryTblmodel query, List<AnswerArr> answerArrs)
        {

            try
            {


                List<QueryTbl> result = db.QueryTbls.Where(c => c.MainCateId == query.MainCateId).ToList();
                if (result == null)
                {
                    var res = new { res = "-1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {


                    for (int i = 0; i < answerArrs.Count; i++)
                    {
                        if (query.MainCateId != null)
                        {

                            int querID = answerArrs[i].QId;
                            var QueryTblmodel = db.QueryTbls.Where(c => c.QId == querID && c.MainCateId == query.MainCateId).FirstOrDefault();
                            if (QueryTblmodel != null)
                            {

                                //QueryTbl queryTbl = new QueryTbl();
                                //queryTbl.QId = db.QueryTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.QId) + 1;
                                //queryTbl.MainCateId = query.MainCateId;
                                QueryTblmodel.AskQues1 = query.AskQues1;
                                QueryTblmodel.Answer = answerArrs[i].Answer;
                                QueryTblmodel.ModelQuery2 = query.ModelQuery2;
                                QueryTblmodel.Create_at = DateTime.Now;
                                QueryTblmodel.Update_at = DateTime.Now;
                                QueryTblmodel.Active = true;
                                db.SaveChanges();
                            }
                            else
                            {

                                QueryTbl queryTbl = new QueryTbl();
                                queryTbl.QId = db.QueryTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.QId) + 1;
                                queryTbl.MainCateId = query.MainCateId;
                                queryTbl.AskQues1 = query.AskQues1;
                                queryTbl.Answer = answerArrs[i].Answer;
                                queryTbl.ModelQuery2 = query.ModelQuery2;
                                queryTbl.Create_at = DateTime.Now;
                                queryTbl.Update_at = DateTime.Now;
                                queryTbl.Active = true;
                                queryTbl.Priority = query.Priority;
                                db.QueryTbls.Add(queryTbl);
                                db.SaveChanges();
                            }
                        }
                    }
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
        //-------------- Submit Query model Start ->------------->---------------------->---------------------------->------->------------>---------->---

        public JsonResult GetQueryToKeyword(int id)
        {
            var res = db.BSubTitleTbls.Where(m => m.QueryId == id && m.Active == true).ToList();
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetKeywordToAskQuestion(int id)
        {
            var res = db.BSubTitleTbls.Where(m => m.BSubId == id && m.Active == true).FirstOrDefault();
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SubmitQueryAnswerKeyword(BSubTitleDetailTbl model, List<KeywordTbl> keywordsTbl)
        {
            try
            {

                model.BSubDId = db.BSubTitleDetailTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.BSubDId) + 1;
                model.MainCateId = model.MainCateId;
                model.kSubTitle = model.kSubTitle;
                db.BSubTitleDetailTbls.Add(model);
                db.SaveChanges();

                if (keywordsTbl != null)
                {

                    for (int i = 0; i < keywordsTbl.Count; i++)
                    {
                        BPTKeywordTbl BPTKeyword = new BPTKeywordTbl();
                        BPTKeyword.MCkeywordId = db.BPTKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.MCkeywordId) + 1;
                        BPTKeyword.BSubDId = model.BSubDId;
                        BPTKeyword.BSubId = model.BSubId;
                        BPTKeyword.QueryId = model.QueryId;
                        BPTKeyword.KeywordId = keywordsTbl[i].KeywordId;
                        BPTKeyword.MainCateId = model.MainCateId;
                        BPTKeyword.Active = true;
                        db.BPTKeywordTbls.Add(BPTKeyword);
                        db.SaveChanges();

                    }
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

        public JsonResult UpdateQueryAnswerKeyword(BSubTitleDetailTbl model, List<KeywordTbl> keywordsTbl)
        {
            try
            {

                var result = db.BSubTitleDetailTbls.Where(s => s.BSubDId == model.BSubDId).FirstOrDefault();
                if (result != null)
                {

                    model.MainCateId = model.MainCateId;
                    model.kSubTitle = model.kSubTitle;
                    db.SaveChanges();
                }
                var totoid = db.BPTKeywordTbls.Where(p => p.BSubDId == model.BSubDId);
                db.BPTKeywordTbls.RemoveRange(totoid);
                db.SaveChanges();
                if (keywordsTbl != null)
                {

                    for (int i = 0; i < keywordsTbl.Count; i++)
                    {
                        BPTKeywordTbl BPTKeyword = new BPTKeywordTbl();
                        BPTKeyword.MCkeywordId = db.BPTKeywordTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.MCkeywordId) + 1;
                        BPTKeyword.BSubDId = model.BSubDId;
                        BPTKeyword.BSubId = model.BSubId;
                        BPTKeyword.QueryId = model.QueryId;
                        BPTKeyword.KeywordId = keywordsTbl[i].KeywordId;
                        BPTKeyword.MainCateId = model.MainCateId;
                        BPTKeyword.Active = true;
                        db.BPTKeywordTbls.Add(BPTKeyword);
                        db.SaveChanges();

                    }
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


        public JsonResult GetQueryAnswerKeyword()
        {
            var res = db.BSubTitleDetailTbls.Select(p => new
            {
                p.MainCateId,
                p.QueryId,
                p.BSubDId,
                p.BSubId,
                p.kSubTitle,
                bMainTitle = db.BannerPTTbls.Where(b => b.MainCateId == p.MainCateId).FirstOrDefault(),
                QueryTitle1 = db.QueryTbls.Where(q => q.MainCateId == p.MainCateId).FirstOrDefault(),
                QueryTitle = db.BSubTitleTbls.Where(q => q.BSubId == p.BSubId).FirstOrDefault(),
                KeywordList = db.BPTKeywordTbls.Where(k => k.BSubDId == p.BSubDId).Select(s => new
                {
                    s.MCkeywordId,
                    s.KeywordId,
                    s.BSubDId,
                    SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                }),
            });
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        //-------------- Submit Query model end ->------------->---------------------->---------------------------->------->------------>---------->---


        //-------------- Submit Festival Banner Start ->------------->---------------------->---------------------------->------->------------>---------->---


        public JsonResult SubmitFestivalBanner(FestivalBannerTbl model)
        {
            // public HttpPostedFileBase Image { get; set; }
            try
            {
                FestivalBannerTbl rws = new FestivalBannerTbl();

                FestivalBannerTbl result = db.FestivalBannerTbls.FirstOrDefault();
                if (result != null)
                {
                    var res = new { res = "-1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    rws.FBannerId = db.FestivalBannerTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.FBannerId) + 1;

                    if (model.Image != null)
                    {
                        string extensionstuimg = Path.GetExtension(model.Image.FileName);
                        model.Image.SaveAs(Server.MapPath("~/images/FestivalBanner/" + rws.FBannerId + "" + extensionstuimg));
                        rws.FBImage = rws.FBannerId + "" + extensionstuimg;
                    }
                    rws.FBTitle = model.FBTitle;
                    rws.Priority = 1;
                    rws.FBPosition = model.FBPosition;
                    rws.FBUrl = model.FBUrl;
                    rws.Active = true;
                    db.FestivalBannerTbls.Add(rws);
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
        public JsonResult UpdateFestivalBanner(FestivalBannerTbl model)
        {
            // public HttpPostedFileBase Image { get; set; }
            try
            {


                //FestivalBannerTbl result = db.FestivalBannerTbls.Where(c => c.FBannerId != model.FBannerId && c.Priority == model.Priority).FirstOrDefault();
                //if (result != null)
                //{
                //    var res = new { res = "-1" };
                //    return Json(res, JsonRequestBehavior.AllowGet);
                //}
                //else
                //{
                var rws = db.FestivalBannerTbls.Where(r => r.FBannerId == model.FBannerId).FirstOrDefault();

                if (model.Image != null)
                {
                    string extensionstuimg = Path.GetExtension(model.Image.FileName);
                    model.Image.SaveAs(Server.MapPath("~/images/FestivalBanner/" + model.FBannerId + "" + extensionstuimg));
                    rws.FBImage = model.FBannerId + "" + extensionstuimg;
                }

                //rws.Priority = model.Priority;
                rws.FBTitle = model.FBTitle;
                rws.FBPosition = model.FBPosition;
                rws.FBUrl = model.FBUrl;
                db.SaveChanges();
                var res = new { res = "1" };
                return Json(res, JsonRequestBehavior.AllowGet);
                //}
            }
            catch (Exception ex)
            {
                var md = ex.Message;
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult FestivalBannerActiveDeActive(int id)
        {
            var jb = db.FestivalBannerTbls.Where(c => c.FBannerId == id).FirstOrDefault();
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
        public JsonResult GetFestivalBanner()
        {

            var res = db.FestivalBannerTbls;
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        //-------------- Submit Festival Banner End ->------------->---------------------->---------------------------->------->------------>---------->---


        //-------------- Submit  Label Product  Start ->------------->---------------------->---------------------------->------->------------>---------->---


        public JsonResult SubmitLabelProduct(LabelProductTbl model)
        {
            try
            {
                LabelProductTbl rws = new LabelProductTbl();

                var result = db.LabelProductTbls.Count();
                if (result >= 3)
                {
                    var res = new { res = "-1" };
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    rws.LabelId = db.LabelProductTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.LabelId) + 1;


                    rws.LTitle = model.LTitle;
                    rws.Priority = model.Priority;
                    rws.Active = true;
                    db.LabelProductTbls.Add(rws);
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
        public JsonResult UpdateLabelProduct(LabelProductTbl model)
        {

            try
            {


                var rws = db.LabelProductTbls.Where(r => r.LabelId == model.LabelId).FirstOrDefault();

                rws.Priority = model.Priority;
                rws.LTitle = model.LTitle;
                db.SaveChanges();
                var res = new { res = "1" };
                return Json(res, JsonRequestBehavior.AllowGet);
                //}
            }
            catch (Exception ex)
            {
                var md = ex.Message;
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult LabelProductActiveDeActive(int id)
        {
            var jb = db.LabelProductTbls.Where(c => c.LabelId == id).FirstOrDefault();
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
        public JsonResult GetLabelProduct()
        {

            var res = db.LabelProductTbls;
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        //-------------- Submit Festival Banner End ->------------->---------------------->---------------------------->------->------------>---------->---



    }
}