
//Variable setting
const email = process.env.ADMIN_EMAIL_ID;
const password = process.env.ADMIN_PASSWORD;
let adminLogin;
let adminLoginErr;
let message;

exports.verifyLogin=(req,res,next)=>{
        (req.session.adminLogin==true)?next():res.redirect('/admin/signin')
    }
exports.getAdminSignin = (req, res) => {
        req.session.adminLogin == true
        ? res.redirect("/admin/dashboard")
        : res.render("admin/admin-signin", {
            adminLoginErr: req.session.adminLoginErr,
            message: req.session.message,
            adminLoginPage: false,
            header_message: "Welcome to myOwnDesign",
        });    
    };

exports.postAdminSignin = (req, res) => {
        if (req.body.email == email) {
            if (req.body.password == password) {
                req.session.adminLogin = true;
                req.session.adminLoginErr = false;
                res.redirect("/admin/dashboard");
            } 
            else {
                req.session.adminLoginErr = true;
                req.session.adminLogin = false;
                req.session.message = "Password does not exist";
                res.redirect("/admin/signin");
            }
        } 
        else {
            req.session.adminLoginErr = true;
            req.session.adminLogin = false;
            req.session.message = "Email-id does not exist";
            res.redirect("/admin/signin");
        }
    };

exports.getAdminDashboard =(req,res)=>{
    res.render('admin/admin-dashboard',{
        adminLoginPage:true,
        header_message:"Dashboard"
    })
}