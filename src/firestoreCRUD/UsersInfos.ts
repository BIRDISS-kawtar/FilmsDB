import {db} from '@/main';
import { doc, setDoc, getDoc,updateDoc,arrayUnion} from "firebase/firestore"; 

/*--------------------Users Infos CRUD-------------------*/
class UsersInfos {
  // Create
  createUser(user,userID) {
    // The document ID is defined in the third argument
    const docRef = doc(db,"UserInfos",userID);
    return setDoc(docRef,user);
  } 
  addToFavorite(userID,movieID){
    // The document ID is defined in the third argument
    const docRef = doc(db,"UserInfos",userID);
    updateDoc(docRef,{moviesID : arrayUnion(movieID)});
  }
  updateUserProfile(userID,userProfile){
    // The document ID is defined in the third argument
    const docRef = doc(db,"UserInfos",userID);
    // Remove empty entries before update
    Object.keys(userProfile).forEach((value, index) => {
        if(!userProfile.value){
          delete userProfile.value;
        }
    });
    updateDoc(docRef,userProfile);
  
  }
  // Read
  getUserInfos(userID){
    const docRef = doc(db,"UserInfos",userID);
    // Retreive a single document 
    const docSnap = getDoc(docRef); 
    return docSnap;
  }
  
}
export default new UsersInfos();
