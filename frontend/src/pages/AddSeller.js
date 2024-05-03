import React, { useState , useEffect} from 'react';
import axios from 'axios';
import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonAlert,
    IonGrid,
    IonList,
    IonItem,
    IonHeader,
    IonButtons,
    IonIcon,
    IonToolbar,
    IonToast
} from '@ionic/react';
import { chevronBack } from "ionicons/icons";
import { Storage } from '@ionic/storage';


function AddSeller() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        number: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [storage, setStorage] = useState(null);

    const initializeStorage = async () => {
        const storageInstance = new Storage();
        await storageInstance.create();
        setStorage(storageInstance);
    };
    
    useEffect(() => {
        initializeStorage();
    }, []);
    

    const handleSubmit = async () => {
        try {
            const token = await storage.get("token");
            if (!token) throw new Error('Token not found');
            const response = await axios.post('http://localhost:8080/admin/addSeller', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data); // Handle success response here
        } catch (error) {
            console.error('Error adding seller:', error);
            setError('Error adding seller. Please try again later.');
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/dashboard" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBack} />
                            &nbsp; <b>Dashboard</b>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding" scrollY={false}>
                <IonGrid className="signin-container" style={{ marginTop: '5em' }}>
                    <IonList>
                        <IonItem>
                            <IonInput name="firstname" value={formData.firstname} onIonChange={handleInputChange} label="Text input" placeholder="Firstname" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput name="lastname" value={formData.lastname} onIonChange={handleInputChange} label="Text input" placeholder="Lastname" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput name="number" value={formData.number} onIonChange={handleInputChange} label="Telephone input" type="number" placeholder="12345678" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput name="email" value={formData.email} onIonChange={handleInputChange} label="Email input" type="email" placeholder="email@domain.com" required ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput name="password" value={formData.password} onIonChange={handleInputChange} label="Password input" type="password" placeholder="Password" required ></IonInput>
                        </IonItem>
                    </IonList>
                </IonGrid>
                <IonButton style={{ display: 'flex', justifyContent: 'center', width: '7em' }} onClick={handleSubmit}>Add seller</IonButton>
                <IonToast
                    isOpen={!!error}
                    message={error}
                    duration={5000}
                    onDidDismiss={() => setError(null)}
                />
            </IonContent>
        </IonPage>
    );
}

export default AddSeller;
