import { useEffect, useState } from 'react';
import { IonAvatar, IonNote, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { cart, heart } from 'ionicons/icons';
import { ProductStore } from '../data/ProductStore';
import { FavouritesStore } from '../data/FavouritesStore';
import { CartStore } from '../data/CartStore';
import { useAdmin } from '../context/authAdminContext';
import { Storage } from '@ionic/storage';
import axios from 'axios';
import { addOutline } from 'ionicons/icons';

const DashboardAdmin = () => {
    const favourites = FavouritesStore.useState(s => s.product_ids);
    const shopCart = CartStore.useState(s => s.product_ids);
    const { admin } = useAdmin();
    const [storage, setStorage] = useState(null);
    const [adminData, setAdminData] = useState();
    const [loading, setLoading] = useState(true);

    const [sellers, setSellers] = useState([]);


    useEffect(() => {
        const initializeStorage = async () => {
            const storage = new Storage();
            await storage.create();
            setStorage(storage);
            const data = await storage.get("admin");
            console.log("data");
            console.log(data);
            setAdminData(data); // Update adminData directly
            setLoading(false);
        };

        initializeStorage();
    }, [loading]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const storage = new Storage();
                await storage.create();
                setStorage(storage);
                const token = await storage.get("token");
                const response = await axios.get('http://localhost:8080/admin/sellers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSellers(response.data);
            } catch (error) {
                console.error('Error fetching sellers:', error);
            }
        };

        fetchData();
    }, []);
    console.log("Sellers :")
    console.log(sellers)

    return (
        <IonPage id="home-page">
            <IonHeader>
                <IonToolbar>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IonRouterLink routerLink="/adminprofil" style={{ textDecoration: 'none', color: 'inherit', padding: '0' }}>
                            <IonAvatar aria-hidden="true">
                                <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                            </IonAvatar>
                        </IonRouterLink>
                        {(adminData != null) && (
                            <IonRouterLink routerLink="/adminprofil">
                                <IonNote size="large" style={{ color: 'blue', padding: '1em', fontSize: "1.15em" }}>Mr.{adminData.firstname.charAt(0).toUpperCase() + adminData.firstname.slice(1)} {adminData.lastname.toUpperCase()}</IonNote>
                            </IonRouterLink>
                        )}
                    </div>
                        <IonButton color="primary" routerLink="/addseller" slot="end">
                        <IonIcon icon={addOutline}  />
                        <IonBadge color="blue" ><b>Add seller</b></IonBadge>
                        </IonButton>
                </IonToolbar>
            </IonHeader>




            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Sellers</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        {sellers.map((seller, index) => (
                            <IonCol key={`seller_list_${index}`}>
                                <IonRouterLink routerLink={`/seller/${seller.id}`} state={{ seller }}>
                                    <IonCard>
                                        <img src={seller.cover} alt="Seller cover" />
                                        <IonCardContent className="categoryCardContent">
                                            <IonCardSubtitle>{`${seller.firstname} ${seller.lastname}`}</IonCardSubtitle>
                                            <IonCardSubtitle>{seller.email}</IonCardSubtitle>
                                        </IonCardContent>
                                    </IonCard>
                                </IonRouterLink>
                            </IonCol>
                        ))}
                    </IonRow>

                </IonGrid>
                {/* <IonGrid>
                    <IonRow>
                        {products.map((seller, index) => (
                            <IonCol size="6" key={`seller_list_${index}`}>
                                <IonCard>
                                    <IonCardContent>
                                        <IonCardSubtitle>{`${seller.firstname} ${seller.lastname}`}</IonCardSubtitle>
                                        <IonCardSubtitle>{seller.email}</IonCardSubtitle>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid> */}
            </IonContent>
        </IonPage>
    );
};

export default DashboardAdmin;
