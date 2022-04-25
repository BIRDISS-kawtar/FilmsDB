<script>
import UsersInfos from "@/firestoreCRUD/UsersInfos";
import {auth} from '@/main';
import { signOut, updateEmail, updatePassword,reauthenticateWithCredential,EmailAuthProvider} from "firebase/auth";
const user = auth.currentUser; // Logged in User
export default {
  name: "profile", 
  data(){
    return{
      /*------ update profile ----------*/
      userProfile : {},
      username : "", // is the userDisplayName
      firstname : "",
      lastname : "",
      email : user.email,
      saved : false,
      /*------- change password ---------*/
      old_password : "",
      new_password : "",
      confirm_new_password : "",
      changed : false,
    };
  },
  created(){
    /*----------------Get User Details From Firestore--------------------*/
    const docSnap = UsersInfos.getUserInfos(user.uid); 
    docSnap.then(docSnap => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.username = docSnap.data().userDisplayName;
        this.firstname = docSnap.data().userFirstName;
        this.lastname = docSnap.data().userLastName;
      } else {
        console.log("No such document!");
      }
    });
    /*----------------END : Get User Details From Firestore---------------*/
  },
  methods: {
    updateEmailOrPwd(email_bool,password_bool){// Update Email or Password
      if (email_bool){// Update Email
        updateEmail(user, this.email)
        .then(() => {
          // Email updated!
          console.log("Email updated!");
          this.saved = true;
        }).catch((error) => {
          // An error occurred
          alert("Error while updating email :"+ error);
        });
      }
      else if (password_bool){// Update Password
        updatePassword(user, this.new_password)
        .then(() => {
          // Password updated!
          console.log("Passwoed updated!");
          this.changed = true;
        }).catch((error) => {
          // An error ocurred
          alert("Error while updating password :"+ error);
        });
      }
    },
    save(){//update profile
      /*------------------Update of Firestore Values-------------------------*/
      UsersInfos.updateUserProfile(user.uid,this.userProfile);
      if(Object.keys(this.userProfile).length != 0 && this.userProfile.constructor === Object){
        this.saved = true;
      }
      /*------------------Update of Firebase Authentication Email------------*/
      if(user.email != this.email){// To do not update even if the email is not updated
        console.log("update email block");
        this.updateEmailOrPwd(true,false); // Firebase
      }
      
    },
    change(){//change password
      /*------------Assuring that the old password is valid---------------*/
      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          this.old_password
        );
        reauthenticateWithCredential(user, credential).then(() => {
          // User re-authenticated
          console.log("Password verified");
          if(this.new_password == this.confirm_new_password){
            this.updateEmailOrPwd(false,true);
          }else{
            alert("The passwords don't match, please retry again!");
          }
        }).catch((errorlogin) => {
          // User is logged out
          alert("Wrong Passwor Error",errorlogin);
          signOut(auth).then(() => {
            this.$router.push('/');
          }).catch((errorlogin) => {
            alert("Error in logout"+errorlogin.message);
            this.$router.push('/');
          });
        });
      } catch (error) {
        console.log("Wrong Password");
      }
    },
  },
  watch: {
    // set watchers to update only the changed values on profile
    username:{
      handler(newValue) {
        this.userProfile["userDisplayName"] = newValue;
        this.saved = false;
        console.log(`username = ${newValue}`);
      },
      immediate: true
    },
    firstname:{
      handler(newValue) {
        this.userProfile["userFirstName"] = newValue;
        this.saved = false;
        console.log(`firstname = ${newValue}`);
      },
      immediate: true
    },
    lastname:{
      handler(newValue) {
        this.userProfile["userLastName"] = newValue;
        this.saved = false;
        console.log(`lastname = ${newValue}`);
      },
      immediate: true
    },
    email:{
      handler(newValue) {
        this.saved = false;
        console.log(`email = ${newValue}`);
      },
      immediate: true
    },
    old_password:{
      handler(newValue) {
        this.changed = false;
        console.log(`old_password = ${newValue}`);
      },
      immediate: true
    },
    new_password:{
      handler(newValue) {
        this.changed = false;
        console.log(`new_password = ${newValue}`);
      },
      immediate: true
    },
    confirm_new_password:{
      handler(newValue) {
        this.changed = false;
        console.log(`confirm_new_password = ${newValue}`);
      },
      immediate: true
    },
  }
};
</script>

<template>
<div class="form-style-1 user-pro">
  <!-----------------Profile Details-------------------->
  <form id="updateProfile" class="user" @submit.prevent="save">
    <h4>Profile details</h4>
    <div class="row">
      <div class="col-md-6 form-it">
        <label>Username</label>
        <input type="text" placeholder="Username" v-model="username">
      </div>
      <div class="col-md-6 form-it">
        <label>Email Address</label>
        <input type="text" placeholder="Email Address" v-model="email">
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 form-it">
        <label>First Name</label>
        <input type="text" placeholder="First Name" v-model="firstname">
      </div>
      <div class="col-md-6 form-it">
        <label>Last Name</label>
        <input type="text" placeholder="Last Name" v-model="lastname">
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <input class="submit" type="submit" value="save">
      </div>
    </div>	
    <div class="row">
      <div class="col-md-6">
        <p v-if="this.saved">Profile Updated !</p>
      </div>
    </div>	
  </form>
  <!-----------------END : Profile Details-------------->
  <!-----------------Change Password-------------------->
  <form id="changePassword" class="password" @submit.prevent="change">
    <h4>Change password</h4>
    <div class="row">
      <div class="col-md-6 form-it">
        <label>Old Password</label>
        <input type="text" v-model="old_password" placeholder="**********">
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 form-it">
        <label>New Password</label>
        <input type="text" v-model="new_password" placeholder="***************">
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 form-it">
        <label>Confirm New Password</label>
        <input type="text" v-model="confirm_new_password" placeholder="*************** ">
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <input class="submit" type="submit" value="change">
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <p v-if="this.changed">Password Changed !</p>
      </div>
    </div>		
  </form>
  <!--------------END :Change Password------------------>
</div>
</template>
