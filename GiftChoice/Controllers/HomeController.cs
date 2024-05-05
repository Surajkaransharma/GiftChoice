using GiftChoice.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Mvc;

namespace GiftChoice.Controllers
{
    public class HomeController : Controller
    {

        GiftChoiceEntities db = new GiftChoiceEntities();
        public ActionResult Index()
        {
            ViewBag.silderData = db.SliderTbls.Where(c => c.Active == true).OrderBy(c => c.Priority);
            return View();
        }
        public JsonResult SliderList()
        {

            var res = db.SliderTbls.Where(c => c.Active == true).Select(c => new
            {
                c.MainCateId,
                c.SUrl,
                c.SliderId,
                c.Priority,
                c.SliderImage,
                c.Active
            }).OrderBy(c => c.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFestivalBanner()
        {

            var res = db.FestivalBannerTbls.Where(c => c.Active == true).OrderBy(c => c.Priority).FirstOrDefault();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMainCateData()
        {

            int MainId = Convert.ToInt32(Session["Main2ID"]);
            Session.Remove("Main2ID");

            if (MainId != 0)
            {
                var res = db.MainCateTbls.Where(m => m.Active == true && m.MainCateId == MainId).Select(m => new
                {
                    m.MainCateId,
                    m.MUrl,
                    m.MTitle,
                    m.Active,
                    m.MImage,
                    m.Priority,
                    MCKeyword = db.MCKeywordTbls.Where(k => k.MainCateId == m.MainCateId && k.Active == true).Select(k => new
                    {

                        k.KeywordId,
                        k.MainCateId,
                        Keyword = db.KeywordTbls.Where(p => p.KeywordId == k.KeywordId && p.Active == true).Select(p => p.Keyword).FirstOrDefault()
                    }),
                }).OrderBy(m => m.Priority);
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var res = db.MainCateTbls.Where(m => m.Active == true).Select(m => new
                {
                    m.MainCateId,
                    m.MUrl,
                    m.MTitle,
                    m.Active,
                    m.MImage,
                    m.Priority,
                }).OrderBy(m => m.Priority);
                return Json(res, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult GetHomeMainCateData()
        {

            var res = db.MainCateTbls.Where(m => m.Active == true && m.CateType == "MainCate" && m.MainCateType == "Normal").Select(m => new
            {
                m.MainCateId,
                m.MUrl,
                m.MTitle,
                m.Active,
                m.MImage,
                m.Priority,
            }).OrderBy(m => m.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);


        }
        public JsonResult GetHomeMainCateHeroData()
        {

            var res = db.MainCateTbls.Where(m => m.Active == true && m.CateType == "MainCate" && m.MainCateType == "Hero").Select(m => new
            {
                m.MainCateId,
                m.MUrl,
                m.MTitle,
                m.Active,
                m.MImage,
                m.Priority,
            }).OrderBy(m => m.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);


        }



        public JsonResult GetBannerCateData()
        {
            int Search = Convert.ToInt32(Session["Search1"]);
            Session.Remove("Search1");

            var res =

               db.BannerCateTbls.Where(m => m.BannerCateId == Search && m.Active == true).Select(m => new
               {
                   m.BannerCateId,
                   m.BUrl,
                   m.BTitle,
                   m.Active,
                   m.Priority,
                   MCKeyword = db.BCKeywordTbls.Where(k => k.BannerCateId == m.BannerCateId && k.Active == true).Select(k => new
                   {

                       k.KeywordId,
                       k.BannerCateId,
                       Keyword = db.KeywordTbls.Where(p => p.KeywordId == k.KeywordId && p.Active == true).Select(p => p.Keyword).FirstOrDefault()
                   }),
               }).OrderBy(m => m.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult BannerList()
        {

            var res = db.BannerTbls.Where(c => c.Active == true).Select(c => new
            {
                c.MainCateId,
                c.BannerId,
                c.Priority,
                c.BUrl,
                c.BannerImage,
                MainCate = db.MainCateTbls.Where(m => m.MainCateId == c.MainCateId).Select(m => m.MTitle).FirstOrDefault(),
                c.Active
            }).OrderBy(c => c.Priority);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [JsonNetFilter]
        public JsonResult GetProduct()
        {

            var res =

               db.ProductTbls.Where(m => (m.ProductType == "MainProduct" || m.ProductType == "Common") && m.Active == true).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.VideoUrl,
                   m.SameDay,
                   m.Price,
                   m.PUrl,
                   m.Video,
                   m.Active,
                   m.Create_at,
                   m.Priority,
                   m.Qty,
                   ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
                   Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),

               }).OrderBy(x => Guid.NewGuid()).Take(8);
            return Json(res, JsonRequestBehavior.AllowGet);

        }
        [JsonNetFilter]
        public JsonResult GetLabelProduct()
        {

            var res =
                new
                {
                    TopsellingProduct = db.ProductTbls.Where(m => m.Active == true && m.LabelId == 1).Select(m => new
                    {
                        Toplabel = db.LabelProductTbls.Where(l => l.LabelId == 1).Select(l => l.LTitle).FirstOrDefault(),
                        m.ProductId,
                        m.MainCateId,
                        m.ProductTitle,
                        m.PLabel,
                        m.PDesc,
                        m.Price,
                        m.PUrl,
                        m.Active,
                        m.Create_at,
                        m.Priority,
                        m.Qty,
                        ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
                        Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),

                    }).OrderBy(x => Guid.NewGuid()).Take(10),
                    NewProduct = db.ProductTbls.Where(m => m.Active == true && m.LabelId == 2 ).Select(m => new
                    {
                        Toplabel = db.LabelProductTbls.Where(l => l.LabelId == 1).Select(l => l.LTitle).FirstOrDefault(),
                        m.ProductId,
                        m.MainCateId,
                        m.ProductTitle,
                        m.PDesc,

                        m.PLabel,
                        m.Price,
                        m.PUrl,
                        m.Active,
                        m.Create_at,
                        m.Priority,
                        m.Qty,
                        ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
                        Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),

                    }).OrderBy(x => Guid.NewGuid()).Take(10),
                    NewArivals = db.ProductTbls.Where(m => m.Active == true && m.LabelId == 3).Select(m => new
                    {
                        Toplabel = db.LabelProductTbls.Where(l => l.LabelId == 1).Select(l => l.LTitle).FirstOrDefault(),
                        m.ProductId,
                        m.MainCateId,
                        m.ProductTitle,
                        m.PLabel,
                        m.Price,
                        m.PDesc,

                        m.PUrl,
                        m.Active,
                        m.Create_at,
                        m.Priority,
                        m.Qty,
                        ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
                        Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),

                    }).OrderBy(x => Guid.NewGuid()).Take(10),

                };
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public class ProductViewModel
        {
            public int ProductId { get; set; }
            public Nullable<int> LabelId { get; set; }

            public string ProductTitle { get; set; }
            public string ProductImage { get; set; }
            public string Video { get; set; }


            public Nullable<double> Price { get; set; }
            public string PUrl { get; set; }
            public bool SameDay { get; set; }

            public Nullable<long> Qty { get; set; }
            public string PLabel { get; set; }


        }

        [JsonNetFilter]
        public JsonResult FilterProduct()
        {


            string Keyword = Convert.ToString(Session["SearchKeyword"]);
            int Main = Convert.ToInt32(Session["Main"]);

            int Search = Convert.ToInt32(Session["Search"]);

            Session.Remove("SearchKeyword");
            Session.Remove("Main");
            Session.Remove("Search");





            if (Keyword != "")
            {
                string[] keywordarray = Keyword.Split(' ');

                string Productkeyword = "";
                for (int i = 0; i < keywordarray.Length; i++)
                {
                    if (Productkeyword == "")
                    {

                        Productkeyword = "'%" + keywordarray[i] + "%'";
                    }
                    else
                    {
                        Productkeyword += "+'%" + keywordarray[i] + "%'";

                    }

                }

                List<ProductViewModel> products = new List<ProductViewModel>();


                using (SqlConnection connection = new SqlConnection(db.Database.Connection.ConnectionString))
                {
                    connection.Open();


                    string sqlQuery = @"
                WITH CTE AS (
                    SELECT p.*, m.MTitle, kw.Keyword , i.PImage, ROW_NUMBER() OVER (PARTITION BY p.ProductId ORDER BY kw.KeywordID, i.PImageId) AS RowNum
                    FROM ProductTbl p
                    JOIN MainCateTbl m ON m.MainCateId = p.MainCateId
                    LEFT JOIN ProductImage i ON p.ProductId = i.ProductId
                    LEFT JOIN PKeywordTbl k ON p.ProductId = k.ProductId
                    LEFT JOIN KeywordTbl kw ON k.KeywordId = kw.KeywordID
                    WHERE  (p.ProductTitle LIKE " + Productkeyword + "  OR kw.Keyword LIKE '%" + Keyword + "%'  OR m.MTitle LIKE '%" + Keyword + "%' ) AND p.Active = 1) SELECT * FROM CTE WHERE RowNum = 1 ORDER BY NEWID()";

                    using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                ProductViewModel product = new ProductViewModel
                                {
                                    ProductId = reader["ProductId"] != DBNull.Value ? Convert.ToInt32(reader["ProductId"]) : 0,
                                    LabelId = reader["LabelId"] != DBNull.Value ? Convert.ToInt32(reader["LabelId"]) : 0,
                                    ProductTitle = reader["ProductTitle"] != DBNull.Value ? reader["ProductTitle"].ToString() : string.Empty,
                                    ProductImage = reader["PImage"] != DBNull.Value ? reader["PImage"].ToString() : string.Empty,
                                    Price = reader["Price"] != DBNull.Value ? Convert.ToDouble(reader["Price"]) : 0,
                                    PLabel = reader["PLabel"] != DBNull.Value ? reader["PLabel"].ToString() : string.Empty,
                                    Qty = reader["Qty"] != DBNull.Value ? Convert.ToInt32(reader["Qty"]) : 0,
                                    PUrl = reader["PUrl"] != DBNull.Value ? reader["PUrl"].ToString() : string.Empty,
                                    Video = reader["Video"] != DBNull.Value ? reader["Video"].ToString() : string.Empty,
                                    SameDay = reader["SameDay"] != DBNull.Value ? Convert.ToBoolean(reader["SameDay"]) : false


                                };
                                products.Add(product);
                            }
                        }
                    }
                }

                return Json(products, JsonRequestBehavior.AllowGet);

                //var res = db.VProducts.Where(m => (Keyword == "" ? true : m.ProductTitle.Contains(Keyword)) || (Keyword == "" ? true : m.Keyword.Contains(Keyword)) && m.Active == true).GroupBy(m => m.ProductTitle).OrderBy(x => Guid.NewGuid());
                //    return Json(res, JsonRequestBehavior.AllowGet);
            }
            else if (Search != 0)
            {
                var res = (from bannerCateProduct in db.BannerCateProductTbls
                           join product in db.ProductTbls on bannerCateProduct.ProductId equals product.ProductId
                           where (Search == 0 ? true : bannerCateProduct.BannerCateId == Search)
                           orderby Guid.NewGuid()
                           select new
                           {
                               bannerCateProduct.BannerCateId,
                               bannerCateProduct.BCProductId,
                               product.ProductId,
                               product.MainCateId,
                               product.ProductTitle,
                               product.PLabel,
                               product.Price,
                               product.SameDay,
                               product.PUrl,
                               LabelId =   product.LabelId ?? 0,
                               product.Video,
                               product.Qty,
                               product.Create_at,
                               product.Active,
                               product.Priority,
                               ProductImage = db.ProductImages
                                       .Where(i => i.ProductId == product.ProductId)
                                       .Select(i => i.PImage)
                                       .FirstOrDefault(),

                               Maincate = db.MainCateTbls
                                       .Where(q => q.MainCateId == product.MainCateId)
                                       .Select(q => q.MTitle)
                                       .FirstOrDefault(),

                           }).ToList();
                //BProductData = db.BannerCateProductTbls.Where(m =>
                //   (Search == 0 ? true : m.BannerCateId == Search)).Select(m => new
                //   {
                //       m.BannerCateId,
                //       m.BCProductId,
                //       m.ProductId,
                //       ProductDetails = db.ProductTbls.Where(p => p.ProductId == m.ProductId).Select(p => new
                //       {
                //           p.ProductId,
                //           p.MainCateId,
                //           p.ProductTitle,
                //           p.PLabel,
                //           p.Price,
                //           p.PUrl,
                //           p.Qty,
                //           p.Create_at,
                //           p.Active,
                //           p.Priority,
                //           ProductImage = db.ProductImages.Where(i => i.ProductId == p.ProductId).Select(i => i.PImage).FirstOrDefault(),
                //           Maincate = db.MainCateTbls.Where(q => q.MainCateId == p.MainCateId).Select(q => q.MTitle).FirstOrDefault(),
                //       }).FirstOrDefault(),

                //   }).OrderBy(x => Guid.NewGuid()),
                //   BannerData = "1"

                return Json(res, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var res =

           db.ProductTbls.Where(m =>
           (Main == 0 ? true : m.MainCateId == Main) && m.Active == true).Select(m => new
           {
               m.ProductId,
               m.MainCateId,
               m.ProductTitle,
               m.PLabel,
               LabelId = m.LabelId ?? 0,
               m.Price,
               m.Video,
               m.PUrl,
               m.SameDay,
               m.Qty,
               m.Create_at,
               m.Active,
               m.Priority,
               ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
               Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),

           }).OrderBy(x => Guid.NewGuid());
                return Json(res, JsonRequestBehavior.AllowGet);
            }


        }

        //[JsonNetFilter]
        //public JsonResult FilterProduct()
        //{
        //   

        //    string Keyword = Convert.ToString(Session["SearchKeyword"]);
        //    int Main = Convert.ToInt32(Session["Main"]);
        //    Session.Clear();

        //    if (Keyword != "")
        //    {
        //        var res =

        //   db.VProducts.Where(m => (Keyword == "" ? true : m.ProductTitle.Contains(Keyword)) || (Keyword == "" ? true : m.Keyword.Contains(Keyword)) && m.Active == true).GroupBy(m => m.ProductTitle).OrderBy(x => Guid.NewGuid());
        //        return Json(res, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        var res =

        //   db.ProductTbls.Where(m =>
        //   (Main == 0 ? true : m.MainCateId == Main) && m.Active == true).Select(m => new
        //   {
        //       m.ProductId,
        //       m.MainCateId,
        //       m.ProductTitle,
        //       m.PLabel,
        //       m.Price,
        //       m.PUrl,
        //       m.Qty,
        //       m.Create_at,
        //       m.Active,
        //       m.Priority,
        //       ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
        //       Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),
        //       Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
        //       {
        //           s.ProductId,
        //           s.KeywordId,
        //           s.PKeywordId,
        //           SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
        //       })
        //   }).OrderBy(x => Guid.NewGuid());
        //        return Json(res, JsonRequestBehavior.AllowGet);
        //    }


        //}
        [JsonNetFilter]
        public JsonResult GetProductByid(int id)
        {

            var res =

               db.ProductTbls.Where(p => p.ProductId == id).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.BannerCateId,
                   m.PLabel,
                   m.Price,
                   m.Create_at,
                   m.Video,
                   m.ProductType,
                   m.PUrl,
                   m.PDesc,
                   m.TableDesc,
                   m.Qty,
                   m.Active,
                   m.Priority,
                   ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
                   AllProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage),
                   Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).FirstOrDefault(),
                   //Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   //{
                   //    s.ProductId,
                   //    s.KeywordId,
                   //    s.PKeywordId,
                   //    SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                   //}),
                   PSizeList = db.PSizeTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   {
                       s.ProductId,
                       s.SizeId,
                       s.PSizeId,
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
               }).FirstOrDefault();
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        [JsonNetFilter]
        public JsonResult GetBProductByid(int id)
        {

            var res =

               db.ProductTbls.Where(p => p.ProductId == id).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.ProductType,
                   m.Price,
                   m.Create_at,
                   m.VideoUrl,
                   m.PUrl,
                   m.PDesc,
                   m.Video,
                   m.Qty,
                   m.SameDay,
                   m.TableDesc,
                   m.Active,
                   m.Priority,
                   m.BannerCateId,
                   ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
                   AllProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage),
                   Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).FirstOrDefault(),
                   Bannercate = db.MainCateTbls.Where(p => p.MainCateId == m.BannerCateId).FirstOrDefault(),
                   //Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
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
               }).FirstOrDefault();
            return Json(res, JsonRequestBehavior.AllowGet);

        }
        [JsonNetFilter]
        public JsonResult GetSmillerProduct(int id, int idd)
        {

            var res =

               db.ProductTbls.Where(p => p.ProductId != id && p.MainCateId == idd && p.Active == true).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Price,
                   m.PUrl,
                   m.Video,
                   m.Create_at,
                   m.Qty,
                   m.Active,
                   m.Priority,
                   ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),

               }).OrderBy(x => Guid.NewGuid()).Take(8);
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        [JsonNetFilter]
        public JsonResult GetBSmillerProduct(int id, int idd)
        {

            var res =

               db.ProductTbls.Where(p => p.ProductId != id && p.BannerCateId == idd && p.Active == true).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Price,
                   m.Video,
                   m.PUrl,
                   m.Create_at,
                   m.Qty,
                   m.Active,
                   m.Priority,
                   ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),

               }).OrderBy(x => Guid.NewGuid()).Take(8);
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }


        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Gift(string url)
        {
            ViewBag.id = db.ProductTbls.Where(p => p.PUrl == url).Select(p => p.ProductId).FirstOrDefault();
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult BGift(string url)
        {
            ViewBag.id = db.ProductTbls.Where(p => p.PUrl == url).Select(p => p.ProductId).FirstOrDefault();
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Shop(string Keyword = "", string Main = "")
        {

            //ViewBag.Keyword = Keyword == "" ? 0 : db.KeywordTbls.Where(m => m.KUrl == Keyword).Select(m => m.KeywordId).FirstOrDefault();

            ViewBag.Keyword = Keyword == "" ? "" : Keyword;
            Session["SearchKeyword"] = ViewBag.Keyword;

            ViewBag.Main = Main == "" ? 0 : db.MainCateTbls.Where(m => m.MTitle == Main).Select(m => m.MainCateId).FirstOrDefault();
            Session["Main"] = ViewBag.Main;
            Session["Main2ID"] = ViewBag.Main;




            return View();
        }

        public ActionResult Gifts(string Search = "")
        {



            ViewBag.Search = Search == "" ? 0 : db.BannerCateTbls.Where(m => m.BUrl == Search).Select(m => m.BannerCateId).FirstOrDefault();
            Session["Search"] = ViewBag.Search;
            Session["Search1"] = ViewBag.Search;




            return View();
        }


        public JsonResult SearchDataShop(string Keyword)
        {
            try
            {

                Session["SearchKeyword"] = Keyword;


                var res = new
                {
                    res = "1",

                    Keywords = Session["SearchKeyword"]


                };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                var res = new
                {
                    res = "0"
                };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Cart()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult checkout()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult privacy_policy()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult thankyou()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult terms_condition()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        public ActionResult BannerGifts()
        {
            return View();
        }
        public ActionResult TopProduct()
        {
            return View();
        }

        public JsonResult GetNavbarMenu()
        {

            var res = new
            {

                NavbarMenuList = db.MainCateTbls.Where(m => m.CateType == "MainCate" && m.Active == true).Select(m => new
                {
                    m.MainCateId,
                    m.MUrl,
                    m.MTitle,
                    m.Priority,

                }).OrderBy(m => m.Priority).Take(6),
                ScondNavbarMenuList = db.MainCateTbls.Where(m => m.CateType == "MainCate" && m.Active == true).Select(m => new
                {
                    m.MainCateId,
                    m.MUrl,
                    m.MTitle,
                    m.Priority,
                }).OrderBy(m => m.Priority).Skip(6),
            };

            return Json(res, JsonRequestBehavior.AllowGet);

        }

        //public JsonResult GetNavbarMenu()
        //{
        //   
        //    var res = new
        //    {

        //        NavbarMenuList = db.BannerCateTbls.Where(m => m.Active == true).Select(m => new
        //        {
        //            m.BannerCateId,
        //            m.BUrl,
        //            m.BTitle,
        //            m.Priority,

        //        }).OrderBy(m => m.Priority).Take(6),
        //        ScondNavbarMenuList = db.BannerCateTbls.Where(m => m.Active == true).Select(m => new
        //        {
        //            m.BannerCateId,
        //            m.BUrl,
        //            m.BTitle,
        //            m.Priority,
        //        }).OrderBy(m => m.Priority).Skip(6),
        //    };

        //    return Json(res, JsonRequestBehavior.AllowGet);

        //}

        public JsonResult GetKeyword()
        {

            var query = new
            {

                Keywordlist = db.KeywordTbls.Where(p => p.Active == true).OrderByDescending(p => p.Keyword).ToList().Distinct()
            };
            return Json(query, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SearchData(string KeyWords)
        {

            Session["Keyword"] = KeyWords;
            var query = new
            {

                Keyword = Session["Keyword"]
            };
            return Json(query, JsonRequestBehavior.AllowGet);

        }


        public JsonResult GetRandomKeyword(string id)
        {



            var res = new
            {

                KeyWordList = (from c in db.AutocompleteSuggestions
                               where c.Suggestion.Contains(id)
                               orderby c.Suggestion.Length
                               select new
                               {
                                   label = c.Suggestion,
                                   value = c.Suggestion,
                                   KUrl = c.Suggestion
                               }).Take(5)

            };
            return Json(res, JsonRequestBehavior.AllowGet);


        }

        public class Cartmodel
        {
            public long RUserId { get; set; }

            [Required]
            public string UName { get; set; }
            [Required]
            public string MobileNo { get; set; }
            public string UEmail { get; set; }
            public string UAddress { get; set; }
            public string City { get; set; }
            public string UState { get; set; }
            public string Pincode { get; set; }
            public Nullable<bool> Active { get; set; }
            public Nullable<System.DateTime> Create_at { get; set; }
            public List<OrderList> OrderList { get; set; }
            public Nullable<double> OrderAmount { get; set; }

        }

        public class OrderList
        {
            public long OrderId { get; set; }
            public long RUserId { get; set; }
            public long ProductId { get; set; }
            public Nullable<long> Qty { get; set; }
            public Nullable<double> Price { get; set; }
            public Nullable<double> OrderAmount { get; set; }
            public Nullable<bool> Active { get; set; }
            public Nullable<bool> Cancel { get; set; }
            public Nullable<System.DateTime> Create_at { get; set; }
        }

        public JsonResult AddOrder(Cartmodel model)
        {
            try
            {
                var result = db.UserRegisters.Where(r => r.MobileNo == model.MobileNo).FirstOrDefault();
                long Userid;
                if (result == null)
                {

                    UserRegister user = new UserRegister();
                    user.RUserId = db.UserRegisters.DefaultIfEmpty().Max(r => r == null ? 0 : r.RUserId) + 1;
                    Userid = user.RUserId;
                    user.UName = model.UName;
                    user.UEmail = model.UEmail;
                    user.MobileNo = model.MobileNo;
                    user.City = model.City;
                    user.UAddress = model.UAddress;
                    user.UState = model.UState;
                    user.Pincode = model.Pincode;
                    user.Create_at = DateTime.Now;
                    user.Active = true;
                    db.UserRegisters.Add(user);
                    db.SaveChanges();

                }
                else
                {
                    Userid = result.RUserId;
                }

                if (model.OrderList != null)
                {

                    OrderMainTbl orderMain = new OrderMainTbl();
                    orderMain.MorderId = db.OrderMainTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.MorderId) + 1;
                    orderMain.RUserId = Userid;
                    orderMain.TotalAmount = model.OrderAmount;
                    orderMain.Create_at = DateTime.Now;
                    orderMain.Delivery = false;
                    orderMain.Dispatch = false;
                    orderMain.Active = true;
                    orderMain.Cancel = false;
                    db.OrderMainTbls.Add(orderMain);
                    db.SaveChanges();

                    for (int i = 0; i < model.OrderList.Count; i++)
                    {

                        OrderTbl orderTbl = new OrderTbl();
                        orderTbl.OrderId = db.OrderTbls.DefaultIfEmpty().Max(r => r == null ? 0 : r.OrderId) + 1;
                        orderTbl.MorderId = orderMain.MorderId;
                        orderTbl.RUserId = Userid;
                        orderTbl.ProductId = model.OrderList[i].ProductId;
                        orderTbl.PPrice = model.OrderList[i].Price;
                        orderTbl.PQty = model.OrderList[i].Qty;
                        orderTbl.OrderAmount = model.OrderAmount;
                        orderTbl.Create_at = DateTime.Now;
                        orderTbl.Active = true;
                        orderTbl.Cancel = false;
                        db.OrderTbls.Add(orderTbl);
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

        public class PriceTbl
        {
            public int id { get; set; }
            public Double? maxPrice { get; set; }
            public Double? minPrice { get; set; }


        }
        //, List<PriceTbl> priceTbls
        [JsonNetFilter]
        public JsonResult FilterProductData(int[] Cid, int[] Bid, Double maxprice, Double minprice)
        {

            if (Cid != null /*&& priceTbls != null*/)
            {


                List<long> subid = new List<long>();

                for (int i = 0; i < Cid.Length; i++)
                {
                    subid.Add(Cid[i]);
                }

                //List<double> price = new List<double>();

                //for (int i = 0; i < priceTbls.Count; i++)
                //{
                //    price.Add(priceTbls[i].minPrice);
                //}

                var res = new
                {
                    //&& priceTbls.Any(priceRange => p.Price >= priceRange.minPrice && p.Price <= priceRange.maxPrice)
                    ProductList =
               db.ProductTbls.Where(p => p.Active == true && subid.Contains(p.MainCateId ?? 0) &&
               (minprice == 0 ? true : p.Price >= minprice) &&
               (maxprice == 0 ? true : p.Price <= maxprice)
               ).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Create_at,
                   m.Price,
                   m.PUrl,
                   m.Active,
                   m.Priority,
                   m.Qty,
                   ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
                   Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),

               }).OrderBy(x => Guid.NewGuid())
                };


                return Json(res, JsonRequestBehavior.AllowGet);
            }
            else if (Bid != null)
            {
                List<long> subid = new List<long>();

                for (int i = 0; i < Bid.Length; i++)
                {
                    subid.Add(Bid[i]);
                }

                var res = new
                {
                    ProductList = (from bannerCateProduct in db.PKeywordTbls
                                   join product in db.ProductTbls on bannerCateProduct.ProductId equals product.ProductId
                                   where subid.Contains(bannerCateProduct.KeywordId ?? 0) &&
                                          (minprice == 0 ? true : product.Price >= minprice) &&
                                        (maxprice == 0 ? true : product.Price <= maxprice)

                                   orderby Guid.NewGuid()
                                   select new
                                   {
                                       bannerCateProduct.PKeywordId,
                                       bannerCateProduct.KeywordId,
                                       product.ProductId,
                                       product.MainCateId,
                                       product.ProductTitle,
                                       product.PLabel,
                                       product.Price,
                                       product.PUrl,
                                       product.Qty,
                                       product.Create_at,
                                       product.Active,
                                       product.Priority,

                                       ProductImage = db.ProductImages
                                               .Where(i => i.ProductId == product.ProductId)
                                               .Select(i => i.PImage)
                                               .FirstOrDefault(),

                                       Maincate = db.MainCateTbls
                                               .Where(q => q.MainCateId == product.MainCateId)
                                               .Select(q => q.MTitle)
                                               .FirstOrDefault(),

                                   }).ToList()
                    //ProductList = db.BannerCateProductTbls.Where(m => subid.Contains(m.BannerCateId ?? 0)).Select(m => new
                    //{
                    //    m.BannerCateId,
                    //    m.BCProductId,
                    //    m.ProductId,
                    //    ProductDetails = db.ProductTbls.Where(p => p.ProductId == m.ProductId).Select(p => new
                    //    {
                    //        p.ProductId,
                    //        p.MainCateId,
                    //        p.ProductTitle,
                    //        p.PLabel,
                    //        p.Price,
                    //        p.PUrl,
                    //        p.Qty,
                    //        p.Create_at,
                    //        p.Active,
                    //        p.Priority,

                    //        ProductImage = db.ProductImages.Where(i => i.ProductId == p.ProductId).Select(i => i.PImage).FirstOrDefault(),
                    //        Maincate = db.MainCateTbls.Where(q => q.MainCateId == p.MainCateId).Select(q => q.MTitle).FirstOrDefault(),
                    //    }).FirstOrDefault(),

                    //}).OrderBy(x => Guid.NewGuid())
                };
                return Json(res, JsonRequestBehavior.AllowGet);
            }

            else
            {
                var res = new
                {
                    ProductList = db.ProductTbls.Where(m => m.Active == true &&
              (minprice == 0 ? true : m.Price >= minprice) &&
              (maxprice == 0 ? true : m.Price <= maxprice)).Select(m => new
              {
                  m.ProductId,
                  m.MainCateId,
                  m.ProductTitle,
                  m.PLabel,
                  m.Price,
                  m.PUrl,
                  m.Active,
                  m.Priority,
                  m.Create_at,
                  m.Qty,
                  ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
                  Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),

              }).OrderBy(x => Guid.NewGuid())
                };


                return Json(res, JsonRequestBehavior.AllowGet);
            }

        }


        ///////// Get Small Bannner Design Banner Multiple Banner


        public JsonResult GetSmallBanner()
        {
            var res = new
            {

                SmallBanner = db.MainCateTbls.Where(m => m.CateType == "BannerCate" && m.Active == true && m.Position == "Small Banner").OrderBy(m => m.Priority).Take(3),

            };

            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetDesignBanner()
        {
            var res = new
            {

                DesignBanner = db.MainCateTbls.Where(m => m.CateType == "BannerCate" && m.Active == true && m.Position == "Design Banner").OrderBy(m => m.Priority).Take(4),

            };

            return Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetMultipleBanner()
        {
            var res = new
            {

                MultipleBanner = db.MainCateTbls.Where(m => m.CateType == "BannerCate" && m.Active == true && m.Position == "Multiple Banner").OrderBy(m => m.Priority),

            };

            return Json(res, JsonRequestBehavior.AllowGet);

        }



        public JsonResult GetBannerAsk1(int banner)
        {
            int bannerid = 0;
            var modelstatustbl = db.MainCateTbls.Where(m => m.MainCateId == banner && m.CateType == "BannerCate").Select(m => m.ModelQuery1).FirstOrDefault();
            bool modelstatus = true;
            if (modelstatustbl == null || modelstatustbl == false)
            {

                modelstatus = false;
            }
            else
            {
                modelstatus = true;
            }


            if (Session["BannerId"] == null)
            {
                bannerid = banner;
                Session["BannerId"] = bannerid;

            }
            else if (Session["BannerId"] != null)
            {

                bannerid = Convert.ToInt32(Session["BannerId"]);
                if (banner == bannerid)
                {
                    modelstatus = false;
                }
                else
                {
                    bannerid = banner;
                    Session["BannerId"] = bannerid;

                }
            }



            var res = new
            {
                Querydata = db.QueryTbls.Where(m => m.MainCateId == banner).Select(m => new
                {
                    m.AskQues1,
                    m.Answer,
                    m.QId,
                    m.MainCateId,
                    BannerTitle = db.MainCateTbls.Where(b => b.MainCateId == m.MainCateId).FirstOrDefault()
                }),
                ModelStatus = modelstatus
            };

            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ContinueAskQues1(int QId)
        {
            Session["QueryId"] = QId;
            var res = db.BSubTitleTbls.Where(m => m.QueryId == QId).Select(m => new
            {
                m.QueryId,
                m.KeywordTitle,
                m.AskQues2,
                m.MainCateId,
                BannerTitle = db.BannerPTTbls.Where(b => b.MainCateId == m.MainCateId).FirstOrDefault(),
                AnswerList = db.BSubTitleDetailTbls.Where(a => a.QueryId == m.QueryId),
                KeyList = db.BPTKeywordTbls.Where(s => s.QueryId == m.QueryId && s.Active == true).Select(s => new
                {
                    s.QueryId,
                    s.KeywordId,
                    SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                }),

            });

            return Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult ContinueAskQues2(int BSubDId)
        {
            Session["BSubDId"] = BSubDId;
            var res = db.BSubTitleDetailTbls.Where(m => m.BSubDId == BSubDId).Select(m => new
            {
                m.QueryId,
                m.BSubDId,
                m.kSubTitle,
                m.MainCateId,
                BannerTitle = db.BannerPTTbls.Where(b => b.MainCateId == m.MainCateId).FirstOrDefault(),
                AnswerList = db.BSubTitleDetailTbls.Where(a => a.QueryId == m.QueryId),
                KeywordList = db.BPTKeywordTbls.Where(s => s.BSubDId == m.BSubDId && s.Active == true).Select(s => new
                {
                    s.QueryId,
                    s.KeywordId,
                    SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                }),

            }).FirstOrDefault();

            return Json(res, JsonRequestBehavior.AllowGet);

        }

        [JsonNetFilter]
        public JsonResult modelTofilterBannerProduct(int[] PBanner, int BannerId)
        {


            if (PBanner != null)
            {

                List<long> subid = new List<long>();

                for (int i = 0; i < PBanner.Length; i++)
                {
                    subid.Add(PBanner[i]);
                }

                var res = new
                {
                    ProductList = (from bannerCateProduct in db.BannerQueryListTbls
                                   join product in db.ProductTbls on bannerCateProduct.ProductId equals product.ProductId
                                   where product.Active == true && (product.ProductType == "BannerProduct" || product.ProductType == "Common") && subid.Contains(bannerCateProduct.QueryId ?? 0) && product.BannerCateId == BannerId
                                   orderby Guid.NewGuid()
                                   select new
                                   {
                                       bannerCateProduct.BannerQueryListId,
                                       bannerCateProduct.QueryId,
                                       product.Video,
                                       product.ProductId,
                                       product.MainCateId,
                                       product.ProductTitle,
                                       product.PLabel,
                                       LabelId = product.LabelId ?? 0,
                                       product.Price,
                                       product.PUrl,
                                       product.Qty,
                                       product.Create_at,
                                       product.VideoUrl,
                                       product.SameDay,
                                       product.Active,
                                       product.Priority,
                                       ProductImage = db.ProductImages
                                               .Where(i => i.ProductId == product.ProductId)
                                               .Select(i => i.PImage)
                                               .FirstOrDefault(),
                                       Maincate = db.MainCateTbls
                                               .Where(q => q.MainCateId == product.MainCateId)
                                               .Select(q => q.MTitle)
                                               .FirstOrDefault(),
                                       Bannercate = db.MainCateTbls
                                               .Where(q => q.MainCateId == product.BannerCateId)
                                               .Select(q => q.MTitle)
                                               .FirstOrDefault(),

                                   }).ToList()
                };
                return Json(res, JsonRequestBehavior.AllowGet);

            }
            else
            {

                var res = new
                {
                    ProductList = (from product in db.ProductTbls
                                   where product.BannerCateId == BannerId && (product.ProductType == "BannerProduct" || product.ProductType == "Common") && product.Active == true
                                   orderby Guid.NewGuid()
                                   select new
                                   {

                                       product.ProductId,
                                       product.MainCateId,
                                       product.BannerCateId,
                                       LabelId = product.LabelId ?? 0,

                                       product.ProductTitle,
                                       product.PLabel,
                                       product.Video,
                                       product.Price,
                                       product.PUrl,
                                       product.Qty,
                                       product.Create_at,
                                       product.VideoUrl,
                                       product.SameDay,
                                       product.Active,
                                       product.Priority,
                                       ProductImage = db.ProductImages
                                               .Where(i => i.ProductId == product.ProductId)
                                               .Select(i => i.PImage)
                                               .FirstOrDefault(),
                                       Maincate = db.MainCateTbls
                                               .Where(q => q.MainCateId == product.MainCateId)
                                               .Select(q => q.MTitle)
                                               .FirstOrDefault(),
                                       Bannercate = db.MainCateTbls
                                               .Where(q => q.MainCateId == product.BannerCateId)
                                               .Select(q => q.MTitle)
                                               .FirstOrDefault(),

                                   }).ToList()
                };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }




        public JsonResult GetTopProduct(string ProductType)
        {
            int labelid = ProductType == "TopsellingProduct" ? 1 : ProductType == "NewArivals" ? 3 : ProductType == "NewProduct" ? 2 : 0;

            var res = new
            {
                ProductList = db.ProductTbls.Where(p => p.ProductType == "MainProduct" && p.LabelId == labelid && p.Active == true).Select(m => new
                {
                    m.ProductId,
                    m.MainCateId,
                    m.ProductTitle,
                    m.PLabel,
                    m.Price,
                    m.PUrl,
                    m.Video,
                    m.SameDay,
                    LabelId = m.LabelId ?? 0,
                    m.Create_at,
                    m.Qty,
                    m.Active,
                    m.Priority,
                    ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),

                }).OrderBy(x => Guid.NewGuid())
            };
            return Json(res, JsonRequestBehavior.AllowGet);

        }

    }
}
