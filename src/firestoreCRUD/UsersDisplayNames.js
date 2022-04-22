import db from '@/main';
import { collection, query, where, getDocs, setDoc} from "firebase/firestore"; 

const UsersRef = collection(db, "Users");
/*--------------------Users CRUD-------------------*/
class UsersDisplayNames {
  // Create
  createUser(user,userID) {
    let UserRef = collection(db,"Users",userID);
    return setDoc(UsersRef,user);
  } 
  // Read
  /* getUser(userID){
    // Query 
    const q = query(UsersRef, where("userID", "==", userID));
    // Execution of query
    const querySnapshot = getDocs(q);
    
    return querySnapshot;
    
  } */
  
}
export default new UsersDisplayNames();
