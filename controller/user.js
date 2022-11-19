exports.getGuestUserPage = (req,res)=>{
    res.render('user/index',{
        userPage:true,
        guestUserPage:true,
    })
}