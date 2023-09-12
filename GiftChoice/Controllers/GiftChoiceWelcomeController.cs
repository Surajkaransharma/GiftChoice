using GiftChoice.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;

namespace GiftChoice.Controllers
{
    public class GiftChoiceWelcomeController : Controller
    {

        // GET: GiftChoiceWelcome
        public ActionResult LoginGiftChoice()
        {
            return View();
        }
        public class usermode
        {
            [Required(ErrorMessage = "Required.")]
            public string Name { get; set; }
            [Required(ErrorMessage = "Required.")]
            public string Pass { get; set; }
        }


        public JsonResult Login(usermode login)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    GiftChoiceEntities db = new GiftChoiceEntities();
                    AdminTbl admin_Login = db.AdminTbls.Where(p => p.UserName == login.Name).FirstOrDefault();
                    if (admin_Login == null)
                    {
                        var res1 = new { res = "User does not exist" };
                        return Json(res1, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        if (admin_Login.UPassword == login.Pass)
                        {
                            Session["AdminCode"] = Convert.ToString(admin_Login.UserId);
                            Session["AdminType"] = Convert.ToString(admin_Login.UserType);


                            var redirectUrl = Url.Action("AddMainCate", "GiftDashBoard"); // Replace with the appropriate action and controller names
                            var res2 = new { res = "1", redirectUrl };
                            return Json(res2, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            var res2 = new { res = "User does not exist" };
                            return Json(res2, JsonRequestBehavior.AllowGet);
                        }


                    }
                }
                var res = new { res = "User does not exist" };
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                var res = new { res = "0" };
                return Json(res, JsonRequestBehavior.AllowGet);

            }

        }

        public ActionResult Logout()
        {
           
            Session["AdminCode"] = "";
            Session["AdminType"] = "";
            Session.Clear();
            return RedirectToAction("Index", "Home");
        }
    }
}