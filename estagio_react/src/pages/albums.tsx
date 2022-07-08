import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import Cards from "../components/Cards";
import { iAlbums, iUsers } from "../interface";
import {
  AlbumContainer,
  AlbumItem,
  AlbumsListContainer,
  Container,
} from "../styles/pages/albums";
import getData from "../utils/getData";

// import { Container } from './styles';

const Albums: React.FC = () => {
  let { userId } = useParams();
  const [albums, setAlbums] = useState([] as iAlbums[]);
  const [user, setUser] = useState<iUsers>({} as iUsers);
  useEffect(() => {
    const getdata = async () => {
      setAlbums(await getData<iAlbums[]>(`/user/${userId}/albums`));
      const user = await getData<iUsers[]>("/users", {
        params: {
          id: userId,
        },
      });
      setUser(user[0]);
    };
    getdata();
    // console.log(user);
  }, []);
  // console.log(user);
  return (
    <AlbumContainer>
      <div style={{ gridArea: "user", paddingLeft: "2vw" }}>
        <Cards user={user} />
      </div>
      <Container gridArea="title_album">
        <div>
          <Link to="/">
            <HiHome size={40} />
          </Link>
          <h1>Lista de Albuns</h1>
        </div>
      </Container>
      <Container gridArea="list_album">
        <AlbumsListContainer>
          {albums.map((album) => (
            <AlbumItem key={album.id}>
              <Link to={`/user/${userId}/albums/${album.id}/photos`}>
                {album.title}
              </Link>
            </AlbumItem>
          ))}
        </AlbumsListContainer>
      </Container>
    </AlbumContainer>
  );
};

export default Albums;
