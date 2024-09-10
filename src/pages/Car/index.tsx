import { useEffect, useState } from "react";
import Container from "../../components/Container";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { FaWhatsapp } from "react-icons/fa";

interface CarsProps {
  id: string;
  name: string;
  model: string;
  whatsapp: string;
  city: string;
  year: string;
  km: string;
  price: string;
  description: string;
  created: string;
  owner: string;
  uid: string;
  images: ImageCarProps[];
}

interface ImageCarProps {
  name: string;
  uid: string;
  url: string;
}

export default function CarDetail() {
  const [car, setCar] = useState<CarsProps>();
  const { id } = useParams();

  useEffect(() => {
    async function loadCar() {
      if (!id) {
        return;
      }

      const docRef = doc(db, "cars", id);
      getDoc(docRef).then((snapshot) => {
        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          model: snapshot.data()?.year,
          whatsapp: snapshot.data()?.whatsapp,
          city: snapshot.data()?.city,
          year: snapshot.data()?.year,
          km: snapshot.data()?.km,
          price: snapshot.data()?.price,
          description: snapshot.data()?.description,
          created: snapshot.data()?.created,
          owner: snapshot.data()?.owner,
          uid: snapshot.data()?.uid,
          images: snapshot.data()?.images,
        });
      });
    }

    loadCar();
  }, [id]);

  return (
    <Container>
      <h1>Slider</h1>
      { car && (
      <main className="w-full bg-white rounded-lg p-6 my-4">
        <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
          <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
          <h1 className="font-bold text-3xl text-black">R$ {car?.price}</h1>
        </div>
        <p>{car?.model}</p>
        
        <div className="flex w-full gap-6 my-4">
          <div className="flex flex-col gap-4">
            <div>
              <p>Cidade</p>
              <strong>{car?.city}</strong>
            </div> 
            <div>
              <p>Ano</p>
              <strong>{car?.year}</strong>
            </div> 
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p>KM</p>
              <strong>{car?.km}</strong>
            </div> 
          </div>
        </div>

        <strong>Descrição:</strong>
        <p className="mb-4">{car?.description}</p>
        

        <strong>Telefone / WhatsApp</strong>
        <p>{car?.whatsapp}</p>

        <a
          className="cursor-pointer bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium"
        >
          Conversar com vendedor
          <FaWhatsapp size={26} color="#FFF" />
        </a>

      </main>
      )}
    </Container>
  );
}
