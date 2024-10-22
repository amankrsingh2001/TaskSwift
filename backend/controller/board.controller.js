const Board = require("../models/board");
const { Category } = require("../models/category");
const { User } = require("../models/user");
const { boardSchema } = require("../utils/zod");

const createBoard =async (req, res) =>{
    
    try {
        const userId = req.authorization
        const body = req.body;
        const {success} = boardSchema.safeParse(body)
        //extract userBody from cookies or auth token
        if(!success){
            return res.status(404).json({
                success:false,
                message:"Please enter valid data"
            })
        }
        const sharable = body.sharable
        const assignedUser = body.assignedUser

        if(!sharable){
            assignedUser = []
        }


        const newBoard = await Board.create({
            admin:userId,
            boardName:body.boardName,
            boardDescripion:body.boardDescripion,
            category:[],
            isFavourite:body.isFavourite,
            shareable:body.sharable
        })

        const updateUser = await User.findOneAndUpdate({
            _id:userId
        },{ $push: { boardList: newBoard._id }},{ new:true })

        if(!updateUser._id){
            return res.status(404).json({
                success:false,
                message:"Failed to update user"
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"Board Created Successfully",
            data:updateUser.boardList
        })
        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}