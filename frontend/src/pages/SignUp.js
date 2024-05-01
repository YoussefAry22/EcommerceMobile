import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook

import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonRow,
  IonCol,
  IonGrid
} from "@ionic/react";
import "./SignUpPage.css"; // Import du fichier CSS

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [storage, setStorage] = useState(null);
	const [auth, setAuth] = useState(false);





  useEffect(() => {
    const initializeStorage = async () => {
        const storage = new Storage();
        await storage.create();
        setStorage(storage);
        const token = await storage.get("token");
  console.log(token)
  if(token){
    setAuth(true);

  }
  console.log(auth)
  
    };

    initializeStorage();
}, [auth]);
  const handleSignUp = () => {
    
    const userData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      role: "USER"
    };
  
    axios.post('http://localhost:8080/auth/signup', userData)
      .then(response => {
        // Handle successful signup here
        console.log("Signup successful!");
        history.push('/signin'); // Redirect to /signin after successful signup
      })
      .catch(error => {
        // Handle errors
        console.error("Signup failed:", error);
      });
  };
  if(!auth){
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding" scrollY={false}>
        <IonGrid className="signup-container">
          <IonRow className="ion-align-items-center">
            <IonCol size="12" className="ion-text-center">
              <h1 className="title">Sign Up</h1>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="12">
              <IonInput
                type="text"
                placeholder="First Name"
                value={firstName}
                onIonChange={(e) => setFirstName(e.detail.value)}
                className="input-field"
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="12">
              <IonInput
                type="text"
                placeholder="Last Name"
                value={lastName}
                onIonChange={(e) => setLastName(e.detail.value)}
                className="input-field"
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="12">
              <IonInput
                type="email"
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value)}
                className="input-field"
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="12">
              <IonInput
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value)}
                className="input-field"
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="12" className="ion-text-center">
              <IonButton expand="block" onClick={handleSignUp} className="signup-button">
                Sign Up
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="12" className="ion-text-center">
              <IonText className="signin-link">
                Already have an account? <a href="/signin">Sign in</a>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );}else{ history.push("/home");}
};

export default SignUpPage;
