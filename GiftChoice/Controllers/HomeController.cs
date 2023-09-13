using GiftChoice.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace GiftChoice.Controllers
{
    public class HomeController : Controller
    {

        GiftChoiceEntities db = new GiftChoiceEntities();
        public ActionResult Index()
        {
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
                MainCate = db.MainCateTbls.Where(m => m.MainCateId == c.MainCateId).Select(m => m.MTitle).FirstOrDefault(),
                c.Active
            }).OrderBy(c => c.Priority);
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
                   //Submenu = db.MCKeywordTbls.Where(s => s.MainCateId == m.MainCateId && s.Active == true).Select(s => new
                   //{
                   //    s.MainCateId,
                   //    s.KeywordId,
                   //    s.MCkeywordId,
                   //    SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId).Select(t => t.Keyword).FirstOrDefault()
                   //})
               });
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
                   ProductImage = db.ProductImages.Where(i => i.PImageId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
                   Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),
                   Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   {
                       s.ProductId,
                       s.KeywordId,
                       s.PKeywordId,
                       SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                   })
               }).OrderBy(x => Guid.NewGuid()).Take(10);
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult FilterProduct(int id)
        {
            var res =

               db.VProducts.Where(m => m.KeywordId == id).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Price,
                   m.PUrl,
                   m.Active,
                   m.Priority,
                   ProductImage = db.ProductImages.Where(i => i.PImageId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
                   Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),
                   Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   {
                       s.ProductId,
                       s.KeywordId,
                       s.PKeywordId,
                       SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                   })
               }).OrderBy(x => Guid.NewGuid()).Take(10);
            return Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetProductByid(int id)
        {
            var res =

               db.ProductTbls.Where(p => p.ProductId == id).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Price,
                   m.PUrl,
                   m.PDesc,
                   m.Active,
                   m.Priority,
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
               }).FirstOrDefault();
            return Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetSmillerProduct(int id)
        {
            var res =

               db.ProductTbls.Where(p => p.ProductId != id && p.Active == true).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Price,
                   m.PUrl,
                 
                   m.Active,
                   m.Priority,
                   ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
                 
               });
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
        public ActionResult Shop(string id)
        {
            ViewBag.id = db.KeywordTbls.Where(m => m.KUrl == id).Select(m => m.KeywordId).FirstOrDefault();
            //  ViewBag.id = id;
            ViewBag.Message = "Your contact page.";

            return View();
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


        public JsonResult GetNavbarMenu()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var res = new
            {

                NavbarMenuList = db.MainCateTbls.Where(m => m.Active == true).Select(m => new
                {
                    m.MainCateId,
                    m.MUrl,
                    m.MTitle,
                    m.Priority,
                    Submenu = db.MCKeywordTbls.Where(s => s.MainCateId == m.MainCateId && s.Active == true).Select(s => new
                    {
                        s.MainCateId,
                        s.KeywordId,
                        s.MCkeywordId,
                        SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId).FirstOrDefault()
                    })
                }).OrderBy(m => m.Priority).Take(6),
                ScondNavbarMenuList = db.MainCateTbls.Where(m => m.Active == true).Select(m => new
                {
                    m.MainCateId,
                    m.MUrl,
                    m.MTitle,
                   m.Priority,
                }).OrderBy(m => m.Priority).Skip(6),
            };

            return Json(res, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetKeyword()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var query = new
            {

                Keywordlist = db.KeywordTbls.Where(p => p.Active == true).OrderByDescending(p => p.Keyword).ToList().Distinct()
            };
            return Json(query, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SearchData(string KeyWords)
       {
            db.Configuration.ProxyCreationEnabled = false;
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

                    KeyWordList = (from c in db.KeywordTbls
                             where c.Keyword.Contains(id)
                             select new
                             {
                                 label = c.Keyword,
                                 value = c.Keyword,
                                 KUrl = c.KUrl
                             }).Take(5)

                };
                return Json(res, JsonRequestBehavior.AllowGet);
            
          
        }

    }
}