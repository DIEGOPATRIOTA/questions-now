import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
//import { useAuth } from "../hooks/useAuth";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import '../styles/auth.scss';
import { Button } from "../compoments/Button";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

export function NewRoow() {
    //const { user, signInWithGoogle } = useAuth();
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if ( newRoom.trim() === '' ) {
            return;
        } 

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authrId: user?.id
        });

        history.push(`/room/${firebaseRoom.key}`)
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                          type="text" 
                          placeholder="Nome da sala"
                          onChange={event => setNewRoom(event.target.value)}
                          value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente <Link to="/"> Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}