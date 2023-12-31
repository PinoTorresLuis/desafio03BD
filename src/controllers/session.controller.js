import { generateToken } from "../utils/jwt.js";
import { logger } from "../utils/logger.js";

//Ruta para loguearse a mi app
export const sessionLogin = async(req,res)=>{
    try {
        if(!req.user){
            res.status(401).send({error:"Invalidate user"})
        }
        req.session.user = {
            first_name : req.user.first_name,
            lastname: req.user.lastname,
            age:req.user.age,
            email:req.user.email
        } 
        const token = generateToken(req.user)
        res.cookie('jwtCookie',token,{
            maxAge: 43200000
        })
        res.status(200).send({payload:req.user})
    } catch (error) {
        logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} Ha ocurrido un error: ${error.message}`)
        res.status(500).send({error:"Error al iniciar sesión", error})
    }
}

//Esta es la ruta de creación de Usuario con GitHub
export const createUserGitHub = async(req,res)=>{
    res.status(200).send({mensaje:"Usuario creado correctamente"});
}

//Ruta de inicio de sesión
export const loginGitHub = async(req,res)=>{
    req.session.user = req.user ; 
    res.status(200).send({mensaje:'sesión creada'});
}

//Prueba de inicio de sesión para el manejo de JWT
export const testSessionJWT = async(req,res)=>{
    res.status(200).send({mensaje:req.user});
    logger.info(req.user.user);
    req.session.user = {
        first_name: req.user.user.first_name,
        lastname : req.user.user.lastname,
        age:req.user.user.age,
        email:req.user.user.email
    }
}

//Ruta current 
export const userCurrent = (req,res)=>{
    res.send(req.user);
}

//Ruta Logout
export const logout =(req,res)=>{
    if (req.session){ //Si existe la sessión, la borramos
        req.session.destroy();
        //res.redirect("/static/signin");
    }
    res.clearCookie("jwtCookie") //Elimino la cookie
    res.status(200).send({resultado:"Logout Éxitoso "})
}