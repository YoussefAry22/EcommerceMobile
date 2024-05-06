// import { useState } from "react";
// import {
//   IonButton,
//   IonContent,
//   IonHeader,
//   IonInput,
//   IonItem,
//   IonLabel,
//   IonPage,
//   IonTitle,
//   IonToolbar,
//   IonToast,
// } from "@ionic/react";
// import axios from "axios";

// const UpdatePhoto = ({ match }) => {
//   const userId = match.params.id;
//   const [file, setFile] = useState(null);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.put(`http://localhost:8080/user/up/${userId}`, formData);
      
//       setToastMessage(response.data);
//       setShowToast(true);
//     } catch (error) {
//       setToastMessage("Error updating user: " + error.message);
//       setShowToast(true);
//     }
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Update Photo</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonItem>
//           <IonLabel>Select Image</IonLabel>
//           <input type="file" onChange={handleFileChange} />
//         </IonItem>
//         <IonButton onClick={handleSubmit}>Update</IonButton>
//         <IonToast
//           isOpen={showToast}
//           onDidDismiss={() => setShowToast(false)}
//           message={toastMessage}
//           duration={3000}
//         />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default UpdatePhoto;


import {
 
  IonToast,
  IonThumbnail,
} from "@ionic/react";
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
import { cart, cartOutline, chevronBackOutline, heart, cameraOutline } from "ionicons/icons";
import { ProductStore } from "../data/ProductStore";
import { FavouritesStore } from "../data/FavouritesStore";
import { CartStore } from "../data/CartStore";
import { useUser } from "../context/authContext";
import { Storage } from "@ionic/storage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useEffect, useState } from "react";


const UpdatePhoto = ({ match }) => {
  const userId = match.params.id;
  const [file, setFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [photoURL, setPhotoURL] = useState(""); // To display the selected photo

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPhotoURL(URL.createObjectURL(event.target.files[0]));
  };

  // const handleTakePhoto = async () => {
  //   try {
  //     const photo = await navigator.mediaDevices.getUserMedia({ video: true });
  //     const photoBlob = await new Promise((resolve) => {
  //       const photoCapture = new ImageCapture(photo.getVideoTracks()[0]);
  //       photoCapture.takePhoto().then((blob) => {
  //         resolve(blob);
  //       });
  //     });
  //     setFile(photoBlob);
  //     setPhotoURL(URL.createObjectURL(photoBlob));
  //     photo.getVideoTracks().forEach(track => track.stop()); // Stop video stream
  //   } catch (error) {
  //     console.error("Error accessing camera:", error);
  //   }
  // };
  const handleTakePhoto = async () => {
    try {
      const constraints = {
        video: { facingMode: "environment" } // Use the rear camera (if available)
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      await videoElement.play();
  
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext("2d").drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob
      canvas.toBlob(blob => {
        setFile(blob);
        setPhotoURL(URL.createObjectURL(blob));
      }, "image/jpeg");
  
      stream.getVideoTracks().forEach(track => track.stop()); // Stop video stream
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  
  const handleSubmit = async () => {
    if (!file) {
      setToastMessage("Please select or take a photo to update.");
      setShowToast(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(`http://localhost:8080/user/up/${userId}`, formData);
      setToastMessage(response.data);
      setShowToast(true);
    } catch (error) {
      setToastMessage("Error updating user: " + error.message);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                color="dark"
                text="Home"
                routerLink="/profile"
                routerDirection="back"
              >
                <IonIcon color="dark" />
                &nbsp;Profile
              </IonButton>
            </IonButtons>
            {/* <IonButtons slot="end">
              <IonBadge color="danger">{favourites.length}</IonBadge>
              <IonButton color="danger" routerLink="/favourites">
                <IonIcon icon={heart} />
              </IonButton>
              <IonBadge color="dark">{shopCart.length}</IonBadge>
              <IonButton color="dark" routerLink="/cart">
                <IonIcon icon={cart} />
              </IonButton>
            </IonButtons> */}
          </IonToolbar>      </IonHeader>

      <IonContent>
        {photoURL && (
          <IonThumbnail>
            <img src={photoURL} alt="Selected" />
          </IonThumbnail>
        )}
        <IonItem>
          <IonLabel>Select Image</IonLabel>
          <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
          <IonButton onClick={handleTakePhoto}>Take Photo</IonButton>
        </IonItem>
        <IonButton onClick={handleSubmit}>Update</IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default UpdatePhoto;
