using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;


namespace GiftChoice.Models
{
    public class AuthorizationFilter : AuthorizeAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationContext filterContext)
        {
            GiftChoiceEntities db = new GiftChoiceEntities();
                    
            int CompanyId = Convert.ToInt32(System.Web.HttpContext.Current.Session["AdminCode"]);
      
        //    string role = Convert.ToString(System.Web.HttpContext.Current.Session["AdminType"]);
            string actionName = filterContext.ActionDescriptor.ActionName;
            string controllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
            string tag = controllerName + actionName;

            if (filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true)
                || filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true))
            {
                // Don't check for authorization as AllowAnonymous filter is applied to the action or controller
                return;
            }

            // Check for authorization
            if (System.Web.HttpContext.Current.Session["AdminCode"] == null)
            {
                filterContext.Result = new HttpUnauthorizedResult();
            }
            if (CompanyId != null)
            {
                bool isPermitted = false;

                var viewPermission = db.AdminTbls.Where(x => x.UserId == CompanyId && x.Active == true).SingleOrDefault();
                if (viewPermission != null)
                {              
                        isPermitted = true;                  
                }
                if (isPermitted == false)
                {
                    filterContext.Result = new RedirectToRouteResult(
                      new RouteValueDictionary
                        {
                             { "controller", "GiftChoiceWelcome" },
                             { "action", "Logout" }
                        });
                }
            }
        }


     
    }
}