<script>
import UsersInfos from "@/firestoreCRUD/UsersInfos";
import {auth} from '@/main';
import { signOut, updateEmail, updatePassword,reauthenticateWithCredential,EmailAuthProvider, EmailAuthCredential} from "firebase/auth";
const user = auth.currentUser; // Logged in User
export default {
  name: "profile", 
  data(){
    return{
      userProfile : {},
      /*------ update profile ----------*/
      username : "", // is the userDisplayName
      firstname : "",
      lastname : "",
      email : user.email,
      /*------- change password ---------*/
      old_password : "",
      new_password : "",
      confirm_new_password : "",
    };
  },
  created(){
    /*----------------User Details From Firestore--------------------*/
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
    /*----------------END :User Details From Firestore---------------*/
  },
  methods: {
    updateEmailOrPwd(email_bool,password_bool){
      if (email_bool){// Update Email
        console.log("Old email :"+user.email);
        updateEmail(user, this.email)
        .then(() => {
          // Email updated!
          console.log("Email updated!");
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
        }).catch((error) => {
          // An error ocurred
          alert("Error while updating password :"+ error);
        });
      }
    },
    save(){
      console.log("save");
      UsersInfos.updateUserProfile(user.uid,this.userProfile);// Firestore
      this.updateEmailOrPwd(true,false); // Firebase
    },
    change(){
      console.log("change");
      /*------------------For Security Measures---------------*/
      try {
        const credential = EmailAuthProvider.credential(
        user.email,
        this.old_password
        );
        reauthenticateWithCredential(user, credential).then(() => {
          // User re-authenticated.
          console.log("Password verified");
        }).catch((errorlogin) => {
          // User re-authenticated.
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
      /*------------------For Security Measures---------------*/
    },
  },
  watch: {
    username:{
      handler(newValue) {
        this.userProfile["userDisplayName"] = newValue;
        console.log(`username = ${newValue}`);
      },
      immediate: true
    },
    firstname:{
      handler(newValue) {
        this.userProfile["userFirstName"] = newValue;
        console.log(`firstname = ${newValue}`);
      },
      immediate: true
    },
    lastname:{
      handler(newValue) {
        this.userProfile["userLastName"] = newValue;
        console.log(`lastname = ${newValue}`);
      },
      immediate: true
    },
  }
};
</script>

<template>
<div class="form-style-1 user-pro">
  <!-----------------Profile Details-------------------->
  <form class="user" @submit.prevent="save">
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
  </form>
  <!-----------------END : Profile Details-------------->
  <!-----------------Change Password-------------------->
  <form class="password" @submit.prevent="change">
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
  </form>
  <!--------------END :Change Password------------------>
</div>
</template>
