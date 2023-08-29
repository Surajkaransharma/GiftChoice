using GiftChoice.Models;
using System;
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
                MenuData = db.MainCateTbls.Select(m => new {
                    m.MainCateId,
                    m.MTitle,
                    Keyword = db.MCKeywordTbls.Where(k => k.MainCateId == m.MainCateId).Select(k => new {
                        k.KeywordId, k.MainCateId, k.MCkeywordId,
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

        //main Main Category


        public  class MainCateTblModel
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
                    model.Image.SaveAs(Server.MapPath("~/images/MainCate/" + mainCateTbl.MUrl + "" + extensionstuimg));
                    mainCateTbl.MImage = mainCateTbl.MUrl + "" + extensionstuimg;
                }
                mainCateTbl.Create_at = DateTime.Now;
                mainCateTbl.Update_at = DateTime.Now;
                mainCateTbl.Active = true;
                mainCateTbl.Priority = model.Priority;
                db.MainCateTbls.Add(mainCateTbl);
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
        //public JsonResult UpadateMain(MainCate_Tbl model)
        //{
        //    try
        //    {
        //        var result = db.MainCate_Tbl.FirstOrDefault(p => p.id == model.id);
        //        if (result != null)
        //        {
        //            result.MainName = model.MainName;
        //            db.SaveChanges();

        //        }
        //        var res = new { res = "1" };
        //        return Json(res, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {

        //        var res = new { res = "0" };
        //        return Json(res, JsonRequestBehavior.AllowGet);
        //    }
        //}
        public JsonResult GetMainCate()
        {
            return Json(db.MainCateTbls, JsonRequestBehavior.AllowGet);

        }

        //public JsonResult GetMainbyid(int id)
        //{
        //    return Json(db.MainCate_Tbl.Where(p => p.id == id), JsonRequestBehavior.AllowGet);
        //}
        //public JsonResult MainCateActiveDeActive(int id)
        //{



        //    var jb = db.MainCate_Tbl.Where(c => c.id == id).FirstOrDefault();
        //    if (jb != null)
        //    {

        //        jb.active = jb.active == true ? false : true;
        //        db.SaveChanges();


        //        var res = new { res = "1" };
        //        return Json(res, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        var res = new { res = "2" };
        //        return Json(res, JsonRequestBehavior.AllowGet);
        //    }

        //}
        public JsonResult GetKeyword()
        {
            return Json(db.KeywordTbls, JsonRequestBehavior.AllowGet);

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
    }
}