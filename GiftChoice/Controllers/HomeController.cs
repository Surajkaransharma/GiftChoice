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
        public ActionResult Gift()
        {
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