import Note from "../models/UserModel.js";
//Get data Notes
export const getNotes = async(req, res) => {
    try{
        const response = await Note.findAll(); //Get seluruh data yang dibuat. Contoh ORM
        res.status(200).json(response);
    }catch(error){
        console.log(error.message);
    }
}
//GetID data Notes
export const getNoteById = async(req, res) => {
    try{
        const response = await Note.findOne({
            where:{
                id:req.params.id
            }
        }); //Get seluruh data yang dibuat. Contoh ORM
        res.status(200).json(response);
    }catch(error){
        console.log(error.message);
    }
}
//Membuat data Note baru
export const createNote = async(req, res) => {
    try{
        await Note.create(req.body); //datanya ngambil dari request
        res.status(201).json({msg: "Note Created"});
    }catch(error){
        console.log(error.message);
    }
}
//Membuat update Note
export const updateNote = async(req, res) => {
    try{
        await Note.update(req.body,{
            where:{
                id: req.params.id
            }
        }); 
        res.status(200).json({msg: "Note Updated"});
    }catch(error){
        console.log(error.message);
    }
}
//Membuat delete Note
export const deleteNote = async(req, res) => {
    try{
        await Note.destroy({
            where:{
                id: req.params.id
            }
        }); 
        res.status(200).json({msg: "Note Deleted"});
    }catch(error){
        console.log(error.message);
    }
}