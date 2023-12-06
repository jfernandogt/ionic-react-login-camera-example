import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonAlert,
} from "@ionic/react";
import { Redirect } from "react-router-dom";

import { useAuth } from "../components/AuthProvider/AuthProvider";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();

  const handleLogin = () => {
    const result = login({
      email,
      password,
    });

    if (!result) {
      setShowAlert(true);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonAlert
          isOpen={showAlert}
          header="Login inválido"
          message="Correo o contraseña incorrectos"
          buttons={["Aceptar"]}
          onDidDismiss={() => setShowAlert(false)}
        ></IonAlert>
        <div id="container">
          <IonList>
            <IonItem>
              <IonInput
                label="Correo"
                value={email}
                onIonInput={(e) => setEmail(e.target.value?.toString() ?? "")}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Contraseña"
                type="password"
                onIonInput={(e) =>
                  setPassword(e.target.value?.toString() ?? "")
                }
              ></IonInput>
            </IonItem>
          </IonList>
          <IonButton onClick={handleLogin} expand="full">
            Iniciar sesión
          </IonButton>
          <IonButton routerLink="/register" expand="full" color={"secondary"}>
            Registrarse
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
