import React, { useEffect, useCallback, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Game } from "./components/Game/Game";
import { Loading } from "./components/Loading/Loading";
import { PrivateLobby } from "./components/Lobby/PrivateLobby";
import { PublicLobby } from "./components/Lobby/PublicLobby";
import { db } from "./services/firebase";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [Comp, setComp] = useState(null);
  const { params } = useRouteMatch();
  const cb = useCallback(() => {
    const roomId = params["roomId"];
    if (roomId) {
      db.ref(`room/${roomId}`).once("value", (data) => {
        const room = data.val();
        if (room) {
          const { active } = room;
          if (active) {
            setComp(<Game roomId={roomId} />);
          } else {
            setComp(<PrivateLobby roomId={roomId} />);
          }
        } else {
          setComp(<PublicLobby />);
        }
        setLoading(false);
      });
    }
  }, [params]);
  useEffect(cb, []);
  return <>{isLoading ? <Loading /> : Comp}</>;
}

export default App;
