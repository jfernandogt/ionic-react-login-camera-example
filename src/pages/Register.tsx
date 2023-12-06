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
import { Redirect, useHistory } from "react-router-dom";

import { useAuth } from "../components/AuthProvider/AuthProvider";

const Register: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordSecondary, setPasswordSecondary] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState("");
  const { isAuthenticated, register } = useAuth();

  const handleRegister = () => {
    if (password !== passwordSecondary) {
      setAlertMessage("Las contraseñas no coinciden");
      return false;
    }

    const result = register({
      email,
      password,
    });

    if (!result) {
      setAlertMessage("El correo ya se encuentra registrado");
      return false;
    }

    history.push("/login");
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
          isOpen={!!alertMessage}
          header="Error"
          message={alertMessage}
          buttons={["Aceptar"]}
          onDidDismiss={() => setAlertMessage("")}
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
            <IonItem>
              <IonInput
                label="Valida contraseña"
                type="password"
                onIonInput={(e) =>
                  setPasswordSecondary(e.target.value?.toString() ?? "")
                }
              ></IonInput>
            </IonItem>
          </IonList>
          <IonButton onClick={handleRegister} expand="full">
            Crear cuenta
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
