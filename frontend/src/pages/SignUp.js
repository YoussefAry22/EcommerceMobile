import React, { useState } from "react";
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

  const handleSignUp = () => {
    // La logique d'inscription sera implémentée ici
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
  };

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
  );
};

export default SignUpPage;
