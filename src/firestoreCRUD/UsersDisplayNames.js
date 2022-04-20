import db from '@/main';
import { collection, query, where, getDocs, addDoc} from "firebase/firestore"; 

const UsersRef = collection(db, "Users");
/*--------------------Users CRUD-------------------*/
class UsersDisplayNames {
  // Create
  createUser(user) {
    return addDoc(UsersRef,user);
  } 
  // Read
  getUser(userID){
    // Query 
    const q = query(UsersRef, where("userID", "==", userID));
    // Execution of query
    const querySnapshot = getDocs(q);
    
    return querySnapshot;
    
  }
  
}
export default new UsersDisplayNames();
