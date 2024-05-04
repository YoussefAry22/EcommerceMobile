import { useEffect, useState } from 'react';
import {
    IonAvatar, IonNote, IonBadge, IonButton, IonButtons,
    IonLabel, IonSpinner, IonItem, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import axios from 'axios';
import { useSeller } from '../../context/AuthSellerContext';
import { Storage } from '@ionic/storage';

const StoreSeller = () => {
    const { seller, isLoading, checkAuthSeller } = useSeller();
    const [storage, setStorage] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const initializeStorage = async () => {
            const storageInstance = new Storage();
            await storageInstance.create();
            setStorage(storageInstance);
            await checkAuthSeller(); // Check seller authentication status
        };

        initializeStorage();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await storage.get("token");
                const response = await axios.get('http://localhost:8080/users/products/seller', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products');
            }
        };

        if (seller && storage) {
            fetchData();
        }
    }, [seller, storage]);
    console.log("seller");
    console.log(seller);
    console.log("product");
    console.log(products);
    return (
        <IonPage id="home-page">
            <IonHeader>
                <IonToolbar>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IonRouterLink routerLink="/sellerprofile" style={{ textDecoration: 'none', color: 'inherit', padding: '0' }}>
                            <IonAvatar aria-hidden="true">
                                <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                            </IonAvatar>
                        </IonRouterLink>
                        {(seller != null) && (
                            <IonRouterLink routerLink="/sellerprofile">
                                <IonNote size="large" style={{ color: 'blue', padding: '1em', fontSize: "1.15em" }}>Mr.{seller.firstname.charAt(0).toUpperCase() + seller.firstname.slice(1)} {seller.lastname.toUpperCase()}</IonNote>
                            </IonRouterLink>
                        )}
                    </div>
                    <IonButton color="primary" routerLink="/addproduct" slot="end">
                        <IonIcon icon={addOutline} />
                        <IonBadge color="blue" ><b>Add a product</b></IonBadge>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Products</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        {products.map((product, index) => (
                            <IonCol key={`product_list_${index}`}>
                                <IonRouterLink routerLink={`/product/${product.idProduct}`} state={{ product }}>
                                    <IonCard>
                                        <img src={product.cover} alt="product cover" />
                                        <IonCardContent className="categoryCardContent">
                                            <IonCardSubtitle>{`${product.nameProduct} ${product.priceProduct}`}</IonCardSubtitle>
                                            <IonCardSubtitle>{product.stockProduct}</IonCardSubtitle>
                                        </IonCardContent>
                                    </IonCard>
                                </IonRouterLink>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default StoreSeller;
