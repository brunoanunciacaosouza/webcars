import { FiTrash } from "react-icons/fi";
import Container from "../../components/Container";
import DashboardHeader from "../../components/PainelHeader";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContexts";
import { deleteObject, ref } from "firebase/storage";

interface CarsProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: ImageCarProps[];
}

interface ImageCarProps {
  name: string;
  uid: string;
  url: string;
}

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState<CarsProps[]>([]);

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) {
        return;
      }

      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));

      getDocs(queryRef).then((snapshot) => {
        let listCars = [] as CarsProps[];

        snapshot.forEach((doc) => {
          listCars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            uid: doc.data().uid,
            price: doc.data().price,
            city: doc.data().city,
            km: doc.data().km,
            images: doc.data().images,
          });
        });

        setCars(listCars);
      });
    }

    loadCars();
  }, [user]);

  async function handleDeleteCar(car: CarsProps) {
    const itemCar = car;
    const docRef = doc(db, "cars", itemCar.id);
    await deleteDoc(docRef);

    itemCar.images.map(async (image) => {
      const imagePath = `images/${image.uid}/${image.name}`;
      const imageRef = ref(storage, imagePath);

      try {
        await deleteObject(imageRef);
        setCars(cars.filter((car) => car.id !== itemCar.id));
      } catch (error) {
        console.log("ERRO ao excluir imagem");
      }
    });
  }

  return (
    <Container>
      <DashboardHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <section key={car.id} className="w-full bg-white rounded-lg relative">
            <button
              className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2"
              onClick={() => handleDeleteCar(car)}
            >
              <FiTrash size={26} color="#000" />
            </button>
            <img
              className="w-full rounded-lg mb-2 max-h-70"
              src={car.images[0].url}
              alt={car.name}
            />
            <p className="font-bold mt-1 px-2 mb-2">{car.name}</p>
            <div className="flex flex-col px-2">
              <span className="text-zinc-700">Ano {car.year}</span>
              <span className="text-black font-bold mt-4">R$ {car.price}</span>
            </div>

            <div className="w-full h-px bg-slate-200 my-2">
              <div className="px-2 pb-2">
                <span className="text-black font-bold">{car.city}</span>
              </div>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}
