export const successResponse = (res,message,data =[],token)=>{
    if(!token){
        return res.status(200).json({
            status: true,
            message ,
            data,
        })
    }
    return res.status(200).json({
        status: true,
        message,
        data,
        token
    })
}