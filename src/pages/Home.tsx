import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import '../styles/auth.scss';
import { Button } from "../compoments/Button";
import { useAuth } from "../hooks/useAuth";

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    
    async function handleCreateRoon() {

        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new');
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando questionamentos" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Faça seus questionamentos em tempo real</p>
            </aside>
            <main className="main-content">
                <div>
                    <img src={logoImg} alt="questionsnow" />
                    <button onClick={handleCreateRoon} className="create-roow">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form>
                        <input 
                          type="text" 
                          placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}