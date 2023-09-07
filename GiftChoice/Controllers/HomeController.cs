using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GiftChoice.Models;

namespace GiftChoice.Controllers
{
    public class HomeController : Controller
    {

        GiftChoiceEntities db = new GiftChoiceEntities();
        public ActionResult Index()
        {
            return View();
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
                   })
               }).FirstOrDefault();
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
        public ActionResult Shop()
        {
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
            var res =

                db.MainCateTbls.Where(m => m.Active == true).Select(m => new
                {
                    m.MainCateId,
                    m.MUrl,
                    m.MTitle,                
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
    }
}