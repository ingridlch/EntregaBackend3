import PetDTO from "../dto/Pet.dto.js";
import {petsService, usersService } from "../services/index.js"
import {generateUser, generatePet} from "../utils/index.js";


const createPets = async(req,res)=> {
    let lpets = []
    for(let i=0; i<100; i++){
        const petDTO = PetDTO.getPetInputFrom(generatePet());
        lpets.push(petDTO);
    }
    res.send({status:"success",payload:lpets})
}

const createUsers = async(req,res)=>{
    let lusers = []
    for(let i=0; i<50; i++){
        const user = await generateUser();
        lusers.push(user);
    }
    res.send({status:"success",payload:lusers})
}

const createUsersPets = async(req,res)=>{
    let {users,pets} = req.body;
    users = isNaN(parseInt(users)) ? 0 : parseInt(users);
    pets  = isNaN(parseInt(pets)) ? 0 : parseInt(pets);
    let lpets = []
    for(let i=0; i<pets; i++){
        const petDTO = PetDTO.getPetInputFrom(generatePet());
        const pet = await petsService.create(petDTO);
        lpets.push(pet);
    }
    let lusers = []
    for(let i=0; i<users; i++){
        const user = await usersService.create(await generateUser());
        lusers.push(user);
    }
    res.send({status:"success",payload:{users:lusers,pets:lpets}})
}

export default {
    createPets,
    createUsers,
    createUsersPets
}