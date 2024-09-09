import { Await, Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import Container from "../../components/Container";
import Input from "../../components/Input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContexts";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { handleInfoUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }

    handleLogout();
  }, []);

  function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });

        handleInfoUser({
          name: data.name,
          email: data.email,
          uid: user.user.uid,
        });
        console.log("cadastrado com sucesso!");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link to="/" className="mb-6 max-w-sm w-full">
          <img src={logoImg} alt="Logo do site" className="w-full" />
        </Link>

        <form
          className="bg-white max-w-xl w-full rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Digite o seu nome completo..."
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite o seu email..."
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite a sua senha..."
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium">
            Registrar
          </button>
        </form>

        <Link to="/login">Já possui uma conta? Faça o login!</Link>
      </div>
    </Container>
  );
}
