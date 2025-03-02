const mongoose =  require("mongoose");


const userSchema = new mongoose.Schema({

userName:{
    type:String,
    require:[true,"plaease add your name"]
},
password:{
    type:String,
    require:[true,"plaease add your password"]

},
gmail:{
    type:String,
    require:[true,"please add your password"],
    unique:[true,"gamil alredy taiken"]
}
}
,{
    timestamps:true

}
)

module.exports = mongoose.model("users",userSchema)