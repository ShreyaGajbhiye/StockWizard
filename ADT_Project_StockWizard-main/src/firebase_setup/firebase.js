// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6kHo0VeHVHyfchTy-KpRhpi8iRnD9PkM",
  authDomain: "stockwizard-25cc8.firebaseapp.com",
  databaseURL: "https://stockwizard-25cc8-default-rtdb.firebaseio.com",
  projectId: "stockwizard-25cc8",
  storageBucket: "stockwizard-25cc8.appspot.com",
  messagingSenderId: "881473344478",
  appId: "1:881473344478:web:67962b2079c2bd7594834f",
  measurementId: "G-52E19PH0SF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// #const analytics = getAnalytics(app);
export const database=firebase.database();

// database.ref('users/123').set({
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   age: 35
// });

const usersRef = database.ref("users");


function signUpUser(name, email, password, userType, q1, a1, q2, a2, p) {
  const newUserRef = usersRef.push(); // Create a new key with the username directly so no duplicates will be there.
  const newUser = {
    name: name,
    email: email,
    password: password,
    userType: userType,
    question1: q1,
    answer1: a1,
    question2: q2,
    answer2: a2,
	phone: p
  };
  newUserRef
    .set(newUser)
    .then(() => {
      console.log("User added to Firebase!");
    })
    .catch((error) => {
      console.error("Error adding user to Firebase: ", error);
    });
}

export const get_user = async (username) => {
  let user_exist = false;
  const snapshot = await usersRef.once("value");
  if (snapshot.exists()) {
    snapshot.forEach((childsnap) => {
      const childData = childsnap.child("name").val();
      if (childData === username) {
        // alert("inside ifff");
        user_exist = true;
      }
    });
  }
  return user_exist;
};

export const get_email = async (email) => {
  let user_exist = false;
  const snapshot = await usersRef.once("value");
  if (snapshot.exists()) {
    snapshot.forEach((childsnap) => {
      const childData = childsnap.child("email").val();
      if (childData === email) {
        // alert("inside ifff");
        user_exist = true;
      }
    });
  }
  return user_exist;
};

export const get_phone = async (phone) => {
  let phone_exist = false;
  const snapshot = await usersRef.once("value");
  if (snapshot.exists()) {
    snapshot.forEach((childsnap) => {
      const childData = childsnap.child("phone").val();
      if (childData === phone) {
        // alert("inside ifff");
        phone_exist = true;
      }
    });
  }
  return phone_exist;
};

export const get_question1 = async (phone) => {
  let phone_exist = null;
  const snapshot = await usersRef.once("value");
  if (snapshot.exists()) {
    snapshot.forEach((childsnap) => {
      const childData = childsnap.child("phone").val();
      if (childData === phone) {
        // alert("inside ifff");
        phone_exist = childsnap.child("question1").val();;
      }
    });
  }
  return phone_exist;
};

export const get_answer1 = async (phone) => {
  let phone_exist = null;
  const snapshot = await usersRef.once("value");
  if (snapshot.exists()) {
    snapshot.forEach((childsnap) => {
      const childData = childsnap.child("phone").val();
      if (childData === phone) {
        // alert("inside ifff");
        phone_exist = childsnap.child("answer1").val();
      }
    });
  }
  return phone_exist;
};

export const get_question2 = async (phone) => {
  let phone_exist = null;
  const snapshot = await usersRef.once("value");
  if (snapshot.exists()) {
    snapshot.forEach((childsnap) => {
      const childData = childsnap.child("phone").val();
      if (childData === phone) {
        // alert("inside ifff");
        phone_exist = childsnap.child("question2").val();
      }
    });
  }
  return phone_exist;
};

export const get_answer2 = async (phone) => {
  let phone_exist = null;
  const snapshot = await usersRef.once("value");
  if (snapshot.exists()) {
    snapshot.forEach((childsnap) => {
      const childData = childsnap.child("phone").val();
      if (childData === phone) {
        // alert("inside ifff");
        phone_exist = childsnap.child("answer2").val();
      }
    });
  }
  return phone_exist;
};

export {signUpUser};
export default firebase;