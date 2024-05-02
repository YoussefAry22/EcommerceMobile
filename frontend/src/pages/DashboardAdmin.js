import { useEffect, useState } from 'react';
import { IonAvatar,IonNote, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { cart, heart } from 'ionicons/icons';
import { ProductStore } from '../data/ProductStore';
import { FavouritesStore } from '../data/FavouritesStore';
import { CartStore } from '../data/CartStore';
import { useAdmin } from '../context/authAdminContext';
import { Storage } from '@ionic/storage';

const DashboardAdmin = () => {
    const products = ProductStore.useState(s => s.products);
    const favourites = FavouritesStore.useState(s => s.product_ids);
    const shopCart = CartStore.useState(s => s.product_ids);
    const { admin } = useAdmin();
    const [storage, setStorage] = useState(null);
    const [adminData, setAdminData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeStorage = async () => {
            const storage = new Storage();
            await storage.create();
            setStorage(storage);
            const data = await storage.get("admin");
            console.log("dataaa");
            console.log(data);
            setAdminData(data); // Update adminData directly
            setLoading(false);
        };

        initializeStorage();
    }, [loading]);
    console.log("adminDataffff")
    console.log(adminData)
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
                        {(adminData!=null) && (
                            <IonRouterLink routerLink="/adminprofil">
                                <IonNote style={{ textDecoration: 'none', color: 'blue', padding: '1em' }}>{adminData.firstname.charAt(0).toUpperCase()+ adminData.firstname.slice(1)} {adminData.lastname.toUpperCase()}</IonNote>
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

export default DashboardAdmin;
