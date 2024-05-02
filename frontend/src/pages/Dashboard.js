import { useEffect, useState } from 'react';
import { IonAvatar, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { cart, heart } from 'ionicons/icons';
import { ProductStore } from '../data/ProductStore';
import { FavouritesStore } from '../data/FavouritesStore';
import { CartStore } from '../data/CartStore';
import { useUser } from '../context/authContext';
import { Storage } from '@ionic/storage';
import { useAdmin } from '../context/authAdminContext';

const Dashboard = () => {

    const products = ProductStore.useState(s => s.products);
    const favourites = FavouritesStore.useState(s => s.product_ids);
    const shopCart = CartStore.useState(s => s.product_ids);
    const { admin } = useAdmin();
    const [storage, setStorage] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const initializeStorage = async () => {
            const storage = new Storage();
            await storage.create();
            setStorage(storage);
            const data = await storage.get("admin");
            console.log(data);
            setAdminData(() => data);
            setLoading(false);
            console.log("+++++")
            console.log(adminData);

        };
        initializeStorage();
    }, [loading]);

    return (
        <IonPage id="home-page">
            <IonHeader>
                <IonToolbar>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IonRouterLink routerLink="/profile" style={{ textDecoration: 'none', color: 'inherit', padding: '0' }}>
                            <IonAvatar aria-hidden="true">
                                <img alt="avatar" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                            </IonAvatar>
                        </IonRouterLink>
                        {adminData && (
                            <IonRouterLink routerLink="/profile" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '8px' }}>
                                <IonTitle>{adminData.firstname} {adminData.lastname}</IonTitle>
                            </IonRouterLink>
                        )}
                    </div>
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


                <IonGrid>
                    <IonRow>
                        {products.map((category, index) => (
                            <IonCol size="6" key={`category_list_${index}`}>
                                <IonCard routerLink={`/category/${category.slug}`} className="categoryCard">
                                    <img src={category.cover} alt="category cover" />
                                    <IonCardContent className="categoryCardContent">
                                        <IonCardSubtitle>{category.name}</IonCardSubtitle>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default Dashboard;
