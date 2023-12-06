import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonAvatar,
  IonFooter,
  IonLabel,
} from "@ionic/react";
import { Redirect } from "react-router-dom";
import { CameraResultType, Camera } from "@capacitor/camera";

import { useAuth } from "../components/AuthProvider/AuthProvider";
import "./Home.css";

const Home: React.FC = () => {
  const [photo, setPhoto] = useState<string>("/stanlee.jpeg");
  const { isAuthenticated, logout } = useAuth();

  const useCamera = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });
    if (image && image.dataUrl) {
      setPhoto(image.dataUrl);
    }
  };

  const useGallery = async () => {
    const images = await Camera.pickImages({
      quality: 100,
    });
    if (images?.photos?.length) {
      const image = images.photos[0].webPath;
      setPhoto(image);
    }
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAvatar>
                <img alt="Perfil" src={photo} />
              </IonAvatar>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={useCamera} expand="full">
                Cámara
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={useGallery} expand="full">
                Galería
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonLabel>¿Deseas cerrar sesión?</IonLabel>
        <IonButton onClick={logout} expand="full">
          Cerrar sesión
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
