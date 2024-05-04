// import { IonAlert, IonAvatar, IonBadge, IonButton, IonButtons, IonCardSubtitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
// import { cart, checkmarkSharp, chevronBackOutline, trashOutline } from "ionicons/icons";
// import { useEffect, useRef, useState } from "react";
// import { CartStore, removeFromCart } from "../data/CartStore";
// import { ProductStore } from "../data/ProductStore";

// import styles from "./CartProducts.module.css";

// const CartProducts = () => {

//     const cartRef = useRef();
//     const products = ProductStore.useState(s => s.products);
//     const shopCart = CartStore.useState(s => s.product_ids);
//     const [cartProducts, setCartProducts] = useState([]);
//     const [amountLoaded, setAmountLoaded] = useState(6);
//     const [total, setTotal] = useState(0);
//     const [showAlert, setShowAlert] = useState(false);
//     const [invoiceDetails, setInvoiceDetails] = useState({
//         name: "",
//         email: "",
//         address: ""
//     });

//     useEffect(() => {
//         const getCartProducts = () => {
//             setCartProducts([]);
//             setTotal(0);
//             shopCart.forEach(product => {
//                 var favouriteParts = product.split("/");
//                 var categorySlug = favouriteParts[0];
//                 var productID = favouriteParts[1];
                
//                 const tempCategory = products.filter(p => p.slug === categorySlug)[0];
//                 const tempProduct = tempCategory.products.filter(p => parseInt(p.id) === parseInt(productID))[0];

//                 const tempCartProduct = {
//                     category: tempCategory,
//                     product: tempProduct
//                 };

//                 setTotal(prevTotal => prevTotal + parseInt(tempProduct.price.replace("£", "")));
//                 setCartProducts(prevSearchResults => [ ...prevSearchResults, tempCartProduct ]);
//             });
//         }
//         getCartProducts();
//     }, [shopCart]);

//     const fetchMore = async (e) => {
//         setAmountLoaded(prevAmount => (prevAmount + 6));
//         e.target.complete();
//     }

//     const removeProductFromCart = async (index) => {
//         const productId = shopCart[index];
//         removeFromCart(productId);
//     }

//     const handleCheckout = () => {
//         setShowAlert(true);
//     }

//     const handleAlertConfirm = () => {
//         // Handle confirming the alert (e.g., submit invoice details)
//         console.log("Invoice details submitted:", invoiceDetails);
//         setShowAlert(false);
//     }

//     return (
//         <IonPage id="category-page" className={styles.categoryPage}>
//             <IonHeader>
//                 <IonToolbar>
//                     <IonButtons slot="start">
//                         <IonButton color="dark" routerLink="/" routerDirection="back">
//                             <IonIcon color="dark" icon={chevronBackOutline} />&nbsp;Categories
//                         </IonButton>
//                     </IonButtons>
//                     <IonTitle>Cart</IonTitle>
//                     <IonButtons slot="end">
//                         <IonBadge color="dark">{shopCart.length}</IonBadge>
//                         <IonButton color="dark">
//                             <IonIcon ref={cartRef} className="animate__animated" icon={cart} />
//                         </IonButton>
//                     </IonButtons>
//                 </IonToolbar>
//             </IonHeader>
            
//             <IonContent fullscreen>
//                 <IonRow className="ion-text-center ion-margin-top">
//                     <IonCol size="12">
//                         <IonNote>{cartProducts && cartProducts.length} {cartProducts.length > 1 || cartProducts.length === 0 ? " products" : " product"} found</IonNote>
//                     </IonCol>
//                 </IonRow>

//                 <IonList>
//                     {cartProducts && cartProducts.map((product, index) => {
//                         if (index <= amountLoaded) {
//                             return (
//                                 <IonItemSliding className={styles.cartSlider} key={index}>
//                                     <IonItem lines="none" detail={false} className={styles.cartItem}>
//                                         <IonAvatar>
//                                             <IonImg src={product.product.image} />
//                                         </IonAvatar>
//                                         <IonLabel className="ion-padding-start ion-text-wrap">
//                                             <p>{product.category.name}</p>
//                                             <h4>{product.product.name}</h4>
//                                         </IonLabel>
//                                         <div className={styles.cartActions}>
//                                             <IonBadge color="dark">{product.product.price}</IonBadge>
//                                             <IonButton fill="clear" color="danger" onClick={() => removeProductFromCart(index)}>
//                                                 <IonIcon icon={trashOutline} slot="icon-only" />
//                                             </IonButton>
//                                         </div>
//                                     </IonItem>
//                                 </IonItemSliding>
//                             );
//                         }
//                     })}
//                 </IonList>
//             </IonContent>

//             <IonFooter className={styles.cartFooter}>
//                 <div className={styles.cartCheckout}>
//                     <IonCardSubtitle>£{total.toFixed(2)}</IonCardSubtitle>
//                     <IonButton color="dark" onClick={handleCheckout}>
//                         <IonIcon icon={checkmarkSharp} />&nbsp;Checkout
//                     </IonButton>
//                 </div>
//             </IonFooter>

//             <IonAlert
//                 isOpen={showAlert}
//                 onDidDismiss={() => setShowAlert(false)}
//                 header="Enter Invoice Details"
//                 inputs={[
//                     {
//                         name: 'name',
//                         type: 'text',
//                         placeholder: 'Name',
//                         value: invoiceDetails.name,
//                         onChange: (e) => setInvoiceDetails({ ...invoiceDetails, name: e.target.value })
//                     },
//                     {
//                         name: 'email',
//                         type: 'email',
//                         placeholder: 'Email',
//                         value: invoiceDetails.email,
//                         onChange: (e) => setInvoiceDetails({ ...invoiceDetails, email: e.target.value })
//                     },
//                     {
//                         name: 'address',
//                         type: 'text',
//                         placeholder: 'Address',
//                         value: invoiceDetails.address,
//                         onChange: (e) => setInvoiceDetails({ ...invoiceDetails, address: e.target.value })
//                     },
//                     {
//                         name: 'numero',
//                         type: 'number',
//                         placeholder: 'telephone',
//                         value: invoiceDetails.numero,
//                         onChange: (e) => setInvoiceDetails({ ...invoiceDetails, numero: e.target.value })
//                     }
//                 ]}
//                 buttons={[
//                     {
//                         text: 'Cancel',
//                         role: 'cancel',
//                         cssClass: 'secondary',
//                         handler: () => setShowAlert(false)
//                     },
//                     {
//                         text: 'Confirm',
//                         handler: handleAlertConfirm
//                     }
//                 ]}
//             />
//         </IonPage>
//     );
// }

// export default CartProducts;
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// eslint-disable-next-line
import { IonAlert, IonAvatar, IonBadge, IonButton, IonButtons, IonCardSubtitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemSliding, IonLabel, IonList, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { cart, checkmarkSharp, chevronBackOutline, trashOutline } from "ionicons/icons";
import styles from "./CartProducts.module.css";
import { CartStore, removeFromCart } from "../data/CartStore";
import { ProductStore } from "../data/ProductStore";

const CartProducts = () => {
    const cartRef = useRef();
    const products = ProductStore.useState(s => s.products);
    const shopCart = CartStore.useState(s => s.product_ids);
    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    //const shopCart = CartStore.useState(s => s.product_ids);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [numero, setNumero] = useState("");
    useEffect(() => {
        console.log("Updated Invoice details:", { name, email, address, numero });
    }, [name, email, address, numero]);

    useEffect(() => {
        const getCartProducts = () => {
            let tempCartProducts = [];
            let tempTotal = 0;
            shopCart.forEach(product => {
                const [categorySlug, productId] = product.split("/");
                const tempCategory = products.find(p => p.slug === categorySlug);
                if (tempCategory) {
                    const tempProduct = tempCategory.products.find(p => p.id === parseInt(productId));
                    if (tempProduct) {
                        const tempCartProduct = {
                            category: tempCategory,
                            product: tempProduct
                        };
                        tempCartProducts.push(tempCartProduct);
                        tempTotal += parseFloat(tempProduct.price.replace("£", ""));
                    }
                }
            });
            setCartProducts(tempCartProducts);
            setTotal(tempTotal);
        };
        getCartProducts();
    }, [shopCart, products]);

    const removeProductFromCart = (index) => {
        const productId = shopCart[index];
        removeFromCart(productId);
    };

    const handleCheckout = () => {
        setShowAlert(true);
    };

    const handleAlertConfirm = () => {
        console.log("!!!",name)
        const invoiceDetails = { name, email, address, numero };
        console.log("Invoice details:", invoiceDetails);

        axios.post('http://localhost:8080/users/commands/add', invoiceDetails)
            .then(response => {
                console.log('Command added successfully:', response.data);
                setShowAlert(false);
                // You can perform any additional actions here after successfully adding the command
            })
            .catch(error => {
                console.error('Error adding command:', error);
                // Handle error here (e.g., show error message)
            });
    };

    return (
        <IonPage id="category-page" className={styles.categoryPage}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBackOutline} />&nbsp;Categories
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Cart</IonTitle>
                    <IonButtons slot="end">
                        <IonBadge color="dark">{shopCart.length}</IonBadge>
                        <IonButton color="dark">
                            <IonIcon ref={cartRef} className="animate__animated" icon={cart} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            
            <IonContent fullscreen>
                <IonRow className="ion-text-center ion-margin-top">
                    <IonCol size="12">
                        <IonNote>{cartProducts.length} {cartProducts.length !== 1 ? "products" : "product"} found</IonNote>
                    </IonCol>
                </IonRow>

                <IonList>
                    {cartProducts.map((product, index) => (
                        <IonItemSliding key={index}>
                            <IonItem lines="none" detail={false}>
                                <IonAvatar>
                                    <IonImg src={product.product.image} />
                                </IonAvatar>
                                <IonLabel className="ion-padding-start ion-text-wrap">
                                    <p>{product.category.name}</p>
                                    <h4>{product.product.name}</h4>
                                </IonLabel>
                                <div className={styles.cartActions}>
                                    <IonBadge color="dark">{product.product.price}</IonBadge>
                                    <IonButton fill="clear" color="danger" onClick={() => removeProductFromCart(index)}>
                                        <IonIcon icon={trashOutline} slot="icon-only" />
                                    </IonButton>
                                </div>
                            </IonItem>
                        </IonItemSliding>
                    ))}
                </IonList>
            </IonContent>

            <IonFooter className={styles.cartFooter}>
                <div className={styles.cartCheckout}>
                    <IonCardSubtitle>£{total.toFixed(2)}</IonCardSubtitle>
                    <IonButton color="dark" onClick={handleCheckout}>
                        <IonIcon icon={checkmarkSharp} />&nbsp;Checkout
                    </IonButton>
                </div>
            </IonFooter>

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Enter Invoice Details"
                inputs={[
                    {
                        name: 'name',
                        type: 'text',
                        placeholder: 'Name',
                        value: name,
                        onIonChange: (e) => setName(()=>e.target.value)
                    },
                    {
                        name: 'email',
                        type: 'email',
                        placeholder: 'Email',
                        value: email,
                        onIonChange: (e) => setEmail(()=>e.target.value)
                    },
                    {
                        name: 'address',
                        type: 'text',
                        placeholder: 'Address',
                        value: address,
                        onIonChange: (e) => setAddress(()=>e.target.value)
                    },
                    {
                        name: 'numero',
                        type: 'tel',
                        placeholder: 'Telephone',
                        value: numero,
                        onIonChange: (e) => setNumero(()=>e.target.value)
                    }
                ]}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => setShowAlert(false)
                    },
                    {
                        text: 'Confirm',
                        handler: handleAlertConfirm
                    }
                ]}
            />
        </IonPage>
    );
}

export default CartProducts;
