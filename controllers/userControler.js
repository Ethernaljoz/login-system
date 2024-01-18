const { json } = require('express')
const User = require('../models/model')
const bcrypt = require ('bcrypt')



const getUsers =  async (req, res)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)

    }catch(err){console.log(err)
    res.status(500).json({message:'user non trouvé'})}


    

}

const register = async (req,res)=>{
    const {name, email,password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({message:'veuillez remplir tout les champs'})
    }

    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400).json({message:'user existe deja'})
    }


    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        return res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })

    }else{
        res.status(400)
        throw new Error('erreur pour créer le user')
    }
    

      

}




const login = async (req, res)=>{
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({message:'please add all the fields'})
    }
    const userinfo = await User.findOne({email})
    
    if(userinfo){
        const user = await bcrypt.compare(password, userinfo.password)
        
        return res.status(200).json(userinfo.name)
    }else(
         res.status(400).json({message:'user dont exist'})
    )

}


module.exports={
    getUsers,
    register,
    login
    
}



























