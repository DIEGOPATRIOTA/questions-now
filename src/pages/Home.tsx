import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import '../styles/auth.scss';
import { Button } from "../compoments/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('');
    
    async function handleCreateRoon() {

        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        history.push(`rooms/${roomCode}`);
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
                    <form onSubmit={handleJoinRoom} >
                        <input 
                          type="text" 
                          placeholder="Digite o código da sala"
                          onChange={event => setRoomCode(event.target.value)}
                          value={roomCode}

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