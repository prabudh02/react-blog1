import config from "../config/config";
import {Client,Account,ID} from 'appwrite'

// export class Authservices{
//    client=new Client();
//    account;
//    constructor(){
//     this.client
//     .setEndpoint(configig.appwriteurl)
//     .setProject(configig.appwriteprojectid);
//     this.account=new Account(this.client);
//    }

//    async creataccount({email,password,name}){
//     try{
//         const user=await this.account.create(ID.unique(),email,password,name)
//         console.log('User created:', user);
//         if(user){
//           console.log('Logged in after account creation:', session);

//           return this.login({email,password})
//         }else{
//             return user;
//         }
//     }catch(err){
//         console.error('Error creating account:', err);
//             throw err;
//         }
//    }

//    async login({email,password}){
//     try{
//     return await this.account.createEmailSession(email,password)}
//     catch(error){
//         console.error('Error logging in:', error);
//         throw error
//     }
//    }

//    async getcurrentuser(){
//     try {
//         return await this.account.get();
//         // Logged in
//     } catch (err) {
//         // Not logged in
//         console.error('Error getting current user:', err);
//         throw err
//     }
    
//    }

//    async logout(){
//     try{
//         return await this.account.deleteSessions();
//     } catch (err) {
//         console.error('Error logging out:', err);
//         throw err
//     }

//    }


// }
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteurl)
            .setProject(config.appwriteprojectid);
        this.account = new Account(this.client);
            
    }

    async createaccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getcurrentuser() {
        try {
            const session = JSON.parse(localStorage.getItem('appwriteSession'));
            if (!session) {
                throw new Error('No session found. User is not authenticated.');
            }
            const user= await this.account.get();
            console.log("user is : ",user)
            return user
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}
const authservice=new AuthService;
export default authservice