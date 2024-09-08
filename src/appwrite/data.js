import config from "../config/config";
import {Client,ID, Databases, Storage, Query} from 'appwrite'

export class Services{
    client =new Client();
    database;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteurl)
        .setProject(config.appwriteprojectid);
        this.database=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    //database methods like create ,update,delete,get,listall
    async createpost({title,slug,content,featuredimage,status,userid}){
        try{
         return await this.database.createDocument(config.appwritedatabaseid,config.appwritecollectionid
            ,slug,{title,content,featuredimage,status,userid}

         )
        }catch(err){
            console.log("appwrite::craetepost error",err)
    }
}
    async updatepost(slug,{title,content,featuredimage,status}){
        try{
            return await this.database.updateDocument(config.appwritedatabaseid,config.appwritecollectionid
                ,slug,{title,content,featuredimage,status}
            )
        }
        catch(err){
            console.log("appwrite::updatepost error",err)
        }
    }

    async deletepost(slug){
        try{
             await this.database.deleteDocument(
                config.appwritedatabaseid,config.appwritecollectionid,slug)
                return true
            
        }
        catch(err){
            console.log("appwrite::deletepost error",err)
            return false
        }
    }

    async getpost(slug){
        try{
            return await this.database.getDocument(
                config.appwritedatabaseid,config.appwritecollectionid,slug)
                //no query given otherwise we can pass query that what data to get
        }
        catch(err){
            console.log("appwrite::getpost error",err)
        }
    }
    async getposts(queries=[Query.equal("status","active")]){
        //query can only apply on attributes which are made indexes 
        //here queries variable take queries where status is active//see query for mor methods
        try{
            return await this.database.listDocuments(
                config.appwritedatabaseid,config.appwritecollectionid,queries)
                //no query given otherwise we can pass query that what data to get
        }
        catch(err){
            console.log("appwrite::getpost error",err)
        }
    }

    //now we will use storage services
    //we will do create or upload file,delete file and getfile

    async uploadfile(file){
        try{
            return await this.bucket.createFile(
                config.appwritebucketid,
                ID.unique,//fileid
                file
            )
        }
        catch(err){
            colsole.log("Appwrite::uploadfile error",err)
        }

    }
    async deletefile (fileid){
        try{
            await this.bucket.deleteFile(
                config.appwritebucketid,
                fileid
            )
            return true
        }
        catch(err){
            console.log("appwrite::deletefile error",err)
            return false
        }

    }
    
    getfilepreview(fileid){//fast response so no need of async 
        try{
            return  this.bucket.getFilePreview(config.appwritebucketid,fileid)
        }
        catch(err){
            console.log("appwrite::getfilepriview error",err)
        }
        

    }

}
const services= new Services();
export default services;