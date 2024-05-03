import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBackOutline, cartOutline, cart } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Storage } from '@ionic/storage';
import styles from "./Product.module.css";

const Seller = () => {
    const { id } = useParams();
    const [seller, setSeller] = useState(null);
    const [storage, setStorage] = useState(null);

    useEffect(() => {
        const initializeStorage = async () => {
            const storageInstance = new Storage();
            await storageInstance.create();
            setStorage(storageInstance);
        };

        initializeStorage();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (storage) {
                    const token = await storage.get("token");
                    const response = await axios.get(`http://localhost:8080/admin/seller/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setSeller(response.data);
                }
            } catch (error) {
                console.error('Error fetching sellers:', error);
            }
        };

        fetchData();
    }, [id, storage]); // Add id and storage as dependencies

    console.log(id);
    console.log(seller);
    return (
        <IonPage id="category-page" className={styles.categoryPage}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/dashboard" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBackOutline} />&nbsp; Dashboard
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {seller && (
                    <IonGrid>
                        <IonRow>
                        <IonCol size="12">
                            <IonCard className={styles.categoryCard}>
                                <IonCardHeader className={styles.productCardHeader}>
            
                                    <img src={seller.image} alt="product pic" />
                                    <p className="ion-text-wrap">{seller.firstname} {seller.lastname}</p>
                                    
                                </IonCardHeader>
                                <IonCardContent className={styles.categoryCardContent}>
                                        <div className={styles.productPrice}>
                                            <IonButton size="large" color="dark" >
                                                <IonIcon icon={cartOutline} />&nbsp;&nbsp;Update Seller
                                                <IonIcon icon={cartOutline} />&nbsp;&nbsp;Delete Seller

                                            </IonButton>
                                        </div>
                                    </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    </IonGrid>
                )}
            </IonContent>
        </IonPage>
    );
}

export default Seller;
