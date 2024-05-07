import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, Link } from "react-router-dom"; // Import useHistory from react-router-dom
import {
  IonRouterLink,
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonRow,
  IonCol,
  IonGrid, IonHeader, IonToolbar, IonButtons,IonIcon, IonTitle, IonBadge, 
  IonToast // Import IonToast for error handling
} from "@ionic/react";
import "./SignUpPage.css"; // Import du fichier CSS
import { Storage } from '@ionic/storage';
import { useUser } from "../context/authContext";
import { cart, checkmarkSharp, chevronBackOutline, trashOutline } from "ionicons/icons";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Define error state
  const history = useHistory(); // Initialize useHistory hook
  const { user, isAuthenticated, isLoading, checkAuthUser } = useUser();
  const [storage, setStorage] = useState(null);
  const [auth, setAuth] = useState(false);




  useEffect(() => {
    const initializeStorage = async () => {
      const storage = new Storage();
      await storage.create();
      setStorage(storage);
      const token = await storage.get("token");
      console.log(token)
      if (token) {
        setAuth(true);

      }
      console.log(auth)

    };

    initializeStorage();
  }, [auth]);

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/signin", {
        email,
        password
      });

      if (response.data.statusCode === 200) {
        console.log("Sign in successful:", response.data);

        // Initialize Ionic Storage
        const storage = new Storage();
        await storage.create();

        // Store the token in Ionic Storage
        await storage.set("token", response.data.token);

        // Redirect to "/home" after successful sign-in

        await checkAuthUser();

        history.push('/home');


      } else {
        console.error("Sign in failed:", error);
        setError("Sign in failed. Please check your credentials."); // Set error messageage
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      setError("Sign in failed. Please check your credentials."); // Set error message
    }
  };
  if (!auth) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="dark" routerLink="/" routerDirection="back">
                <IonIcon color="dark" icon={chevronBackOutline} />&nbsp;Store
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding" scrollY={false}>
          <img alt="avatar" src="../../assets/signinn.png" style={{ display: 'block', margin: '20%' }} />
          <h1 className="title" style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '-10% 0', color: '#333'
          }}>Signin now to get all fonctionnalities ! </h1>
          <IonGrid className="signin-container" style={{ marginTop: '25%' }}>
            <IonRow className="ion-align-items-center">
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
            <IonRow className="ion-align-items-center">
              <IonCol size="12" className="ion-text-center">
                <IonText className="signup-link">
                  <IonRouterLink routerLink="/signinasseller" style={{ display: 'block', marginTop: '10%', textDecoration: 'none', color: '#007bff' }}>
                    Move to SELLER space.
                  </IonRouterLink>
                  <IonRouterLink routerLink="/signinasadmin" style={{ display: 'block', marginTop: '10%', textDecoration: 'none', color: '#007bff' }}>
                    Move to ADMIN space.
                  </IonRouterLink>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          {/* Render IonToast for error handling */}
          <IonToast
            isOpen={!!error} // Show toast if error is not empty
            message={error} // Error message to display
            duration={5000} // Duration in milliseconds
            onDidDismiss={() => setError("")} // Clear error state when toast is dismissed
          />
        </IonContent>
      </IonPage>
    );
  } else { history.push("/home"); }
};

export default SignIn;
