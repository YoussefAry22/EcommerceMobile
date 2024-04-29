
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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // La logique de connexion sera implémentée ici
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding" scrollY={false}>
      <IonGrid className="signin-container" style={{ marginTop: '300px' }}>
        <IonRow className="ion-align-items-center">
            <IonCol size="12" className="ion-text-center ">
              <h1 className="title">Sign In</h1>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center ">
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
              <IonButton expand="block" onClick={handleSignIn} className="signup-button">
                Sign In
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="12" className="ion-text-center">
              <IonText className="signup-link">
                Don't have an account? <a href="/signup">Sign up</a>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
