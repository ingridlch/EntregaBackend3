import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import {faker} from "@faker-js/faker"

// createHash & passwordValidation
export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}
export const passwordValidation = async(user,password) => bcrypt.compare(password,user.password);

// generateUser & generatePet
export const generateUser = async()=>{
    const firstName = faker.person.firstName();
    const lastName  = faker.person.lastName();
    const password  = await createHash('coder123');
    return {
        first_name: firstName,
        last_name: lastName,
        email: faker.internet.email({ firstName, lastName}),
        password,
        role : (Math.random()>0.3) ? 'user' : 'admin',
        pets : []
    }
}
export const generatePet = ()=>{
    return {
        name:faker.animal.petName(),
        specie:faker.animal.type(),
        birthDate:faker.date.between({ from: '2010-01-01', to: Date.now() }),
        image:''
    }
}

// __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;