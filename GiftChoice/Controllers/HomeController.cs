using GiftChoice.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [JsonNetFilter]
        public JsonResult GetProduct()
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
                   m.Active,
                   m.Create_at,
                   m.Priority,
                   m.Qty,
                   ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
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
        [JsonNetFilter]
        public JsonResult FilterProduct(string Keyword = "", string Main = "")
        {
            if (Keyword != "")
            {
                var res =

           db.VProducts.Where(m => (Keyword == "" ? true : m.KUrl == Keyword)).Select(m => new
           {
               m.ProductId,
               m.MainCateId,
               m.ProductTitle,
               m.PLabel,
               m.Price,
               m.PUrl,
               m.Qty,
               m.Create_at,
               m.Active,
               m.Priority,
               ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
               Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),
               Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
               {
                   s.ProductId,
                   s.KeywordId,
                   s.PKeywordId,
                   SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
               })
           }).OrderBy(x => Guid.NewGuid());
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            else
            {

                long Mid = db.MainCateTbls.Where(p => p.MUrl == Main).Select(p => p.MainCateId).FirstOrDefault();

                var res =

           db.ProductTbls.Where(m =>
           (Mid == 0 ? true : m.MainCateId == Mid)).Select(m => new
           {
               m.ProductId,

               m.MainCateId,
               m.ProductTitle,
               m.PLabel,
               m.Price,
               m.PUrl,
               m.Qty,
               m.Create_at,
               m.Active,
               m.Priority,
               ProductImage = db.ProductImages.Where(i => i.ProductId == m.ProductId).Select(i => i.PImage).FirstOrDefault(),
               Maincate = db.MainCateTbls.Where(p => p.MainCateId == m.MainCateId).Select(p => p.MTitle).FirstOrDefault(),
               Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
               {
                   s.ProductId,
                   s.KeywordId,
                   s.PKeywordId,
                   SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
               })
           }).OrderBy(x => Guid.NewGuid());
                return Json(res, JsonRequestBehavior.AllowGet);
            }


        }
        [JsonNetFilter]
        public JsonResult GetProductByid(string Details)
        {
            var res =

               db.ProductTbls.Where(p => p.PUrl == Details).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Price,
                   m.Create_at,
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
        [JsonNetFilter]
        public JsonResult GetSmillerProduct(string Details)
        {
            var res =

               db.ProductTbls.Where(p => p.PUrl != Details && p.Active == true).Select(m => new
               {
                   m.ProductId,
                   m.MainCateId,
                   m.ProductTitle,
                   m.PLabel,
                   m.Price,
                   m.PUrl,
                   m.Create_at,
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

        public ActionResult Shop(string Keyword = "", string Main = "")
        {

            ViewBag.Keyword = Keyword == "" ? 0 : db.KeywordTbls.Where(m => m.KUrl == Keyword).Select(m => m.KeywordId).FirstOrDefault();


            ViewBag.Main = Main == "" ? 0 : db.MainCateTbls.Where(m => m.MUrl == Main).Select(m => m.MainCateId).FirstOrDefault();




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
        public JsonResult FilterProductData(int[] Cid)
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
               db.ProductTbls.Where(p => p.Active == true && subid.Contains(p.MainCateId ?? 0)).Select(m => new
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
                   Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                   {
                       s.ProductId,
                       s.KeywordId,
                       s.PKeywordId,
                       SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                   })
               }).OrderBy(x => Guid.NewGuid()).Take(10)
                };


                return Json(res, JsonRequestBehavior.AllowGet);
            }

            else
            {
                var res = new
                {
                    ProductList = db.ProductTbls.Where(m => m.Active == true).Select(m => new
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
                        Submenu = db.PKeywordTbls.Where(s => s.ProductId == m.ProductId && s.Active == true).Select(s => new
                        {
                            s.ProductId,
                            s.KeywordId,
                            s.PKeywordId,
                            SubmenuTitle = db.KeywordTbls.Where(t => t.KeywordId == s.KeywordId && t.Active == true).Select(t => t.Keyword).FirstOrDefault()
                        })
                    }).OrderBy(x => Guid.NewGuid()).Take(10)
                };


                return Json(res, JsonRequestBehavior.AllowGet);
            }

        }


    }
}