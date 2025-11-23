import type { Request, Response } from "express";
const Player = require("../schema/Player");
const Debug = require("../utility/Debug");

async function create(req: Request, res: Response) {
    try {
        const player = await Player.create(req.body);
        
        res.status(201).json({
            success: true,
            message: 'Player Created Successfully',
            data: player
        });
    } catch (error: any) {
        if (error) {
            if (error.name == "ValidationError") {
                const messages: string[] = Object.values(error.errors).map((err: any) => err.message);
                
                Debug.log(messages.concat(", "));
                return res.status(400).json({
                    success: false,
                    message: 'Validation Error',
                    errors: messages
                });
            } else if (error.code == 11000) {
                const field = Object.keys(error.keyPattern)[0];

                return res.status(400).json({
                    success: false,
                    message: `${field} already exists`
                });
            }
        }
    }
}

async function getAll(req: Request, res: Response) {
    try {
        const player = await Player.find();
        res.status(200).json({
            success: true,
            count: player.length,
            data: player
        })
    } catch(error: any){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

async function getPlayer(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const player = await Player.findById(id);
        if(!player){
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        res.status(200).json({
            success: true,
            data: player
        })
    } catch(error: any){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        if(!username || !password)
            {
            return res.status(400).json({
                success: false, 
                message: 'Please provide a valid username or password'
            });
        }

        const player = await Player.findOne ({username});
        if(!player || player.password !== password){
            res.status(400).json({
                success: false,
                message: 'Invalid Username or Password'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Login Successful',
            data: player
        });
    } catch(error: any){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

async function deletePlayer(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const player = await Player.findByIdAndDelete(id);
        if(!player){
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }
        res.status(200).json({
            success: true,
            message: 'Player deleted successfully'
        })
    } catch(error: any){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

async function updateData(req: Request, res: Response) {
    try {
        const id = req.params.id
        const { value } = req.body;
        const field = req.params.field as string;

        const player = await Player.findById(id);
        if(!player){
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        if(value < 0) player[field] = 0;
        player[field] = value;

        await player.save();        

        res.status(200).json({
            success: true,
            data: player
        })
    } catch(error: any){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}