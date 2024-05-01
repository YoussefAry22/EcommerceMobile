import { useEffect, useState } from "react";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cart, cartOutline, chevronBackOutline, heart } from "ionicons/icons";
import { ProductStore } from "../data/ProductStore";
import { FavouritesStore } from "../data/FavouritesStore";
import { CartStore } from "../data/CartStore";
import { useUser } from "../context/authContext";
import { Storage } from "@ionic/storage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const products = ProductStore.useState((s) => s.products);
  const favourites = FavouritesStore.useState((s) => s.product_ids);
  const shopCart = CartStore.useState((s) => s.product_ids);
  const {  clearStorage } = useUser();
  const [storage, setStorage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [auth, setAuth] = useState(true);


  useEffect(() => {
    const initializeStorage = async () => {
      const storage = new Storage();
      await storage.create();
      setStorage(storage);
      const data = await storage.get("user");
      console.log(data);
      setUserData(() => data);
      setLoading(false);
      console.log(userData);
    
    };

    initializeStorage();
  }, [loading]);

  useEffect(() => {
    const initializeStorage = async () => {
        const storage = new Storage();
        await storage.create();
        setStorage(storage);
        const token = await storage.get("token");
        console.log(token)
        if(token){
            setAuth((e)=>true);

        }
        console.log(auth)
        
    };

    initializeStorage();
}, [auth]);



 const logout =()=>{
    window.location.href = "/signIn";
    clearStorage();



  }
  if(auth){
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="dark"
              text="Home"
              routerLink="/"
              routerDirection="back"
            >
              <IonIcon color="dark" />
              &nbsp;Home
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonBadge color="danger">{favourites.length}</IonBadge>
            <IonButton color="danger" routerLink="/favourites">
              <IonIcon icon={heart} />
            </IonButton>
            <IonBadge color="dark">{shopCart.length}</IonBadge>
            <IonButton color="dark" routerLink="/cart">
              <IonIcon icon={cart} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Categories</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <IonGrid>
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Profile</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent fullscreen>
                {" "}
                <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  <h2></h2>
                  {userData && (
                    <div>
                      <IonLabel>First Name:</IonLabel>
                      <IonItem>
                        <IonLabel style={{ textAlign: "center" }}>
                          {userData.firstname}
                        </IonLabel>
                      </IonItem>
                      <IonLabel style={{ textAlign: "center" }}>
                        Last Name:
                      </IonLabel>
                      <IonItem>
                        <IonLabel style={{ textAlign: "center" }}>
                          {userData.lastname}
                        </IonLabel>
                      </IonItem>
                      <IonLabel style={{ textAlign: "center" }}>
                        Email:{" "}
                      </IonLabel>
                      <IonItem>
                        <IonLabel style={{ textAlign: "center" }}>
                          {userData.email}
                        </IonLabel>
                      </IonItem>
                  
                    </div>
                  )}
                </div>
                
              </IonContent>
              <IonButton color="dark" onClick={()=> logout() } >
                            Log Out
                        </IonButton>
            </IonPage>
                    
      
          </IonGrid>
          
        )}
        
      </IonContent>
    </IonPage>
  );}else{ history.push("/signIn");}
};

export default Profile;
