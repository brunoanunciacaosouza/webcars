import { FiUpload } from "react-icons/fi";
import Container from "../../../components/Container";
import DashboardHeader from "../../../components/PainelHeader";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/Input";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model: z.string().nonempty("O modelo é obrigatório"),
  year: z.string().nonempty("O ano é obrigatório"),
  km: z.string().nonempty("O KM é obrigatório"),
  price: z.string().nonempty("O preço é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z
    .string()
    .min(1, "O Telefone é obrigatório")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Numero de telefone invalido.",
    }),
  description: z.string().nonempty("A descrição é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function New() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <DashboardHeader />

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
            />
          </div>
        </button>
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="mb-2 font-medium">Nome</label>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Ex: Onix 1.0..."
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 font-medium">Modelo</label>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Ex: 1.0 Flex Manual"
            />
          </div>

          <div className="flex w-full flex-row items-center gap-4">
            <div className="w-full">
              <label className="mb-2 font-medium">Ano</label>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2020/2021"
              />
            </div>

            <div className="w-full">
              <label className="mb-2 font-medium">Km rodados</label>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="Ex: 1000"
              />
            </div>
          </div>

          <div className="flex w-full flex-row items-center gap-4">
            <div className="w-full">
              <label className="mb-2 font-medium">Telefone/ whatsApp</label>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 011XXXXXXXXX"
              />
            </div>

            <div className="w-full">
              <label className="mb-2 font-medium">Cidade</label>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Ex: Campo Grande - MS"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-2 font-medium">Preço</label>
            <Input
              type="text"
              register={register}
              name="price"
              error={errors.price?.message}
              placeholder="69.0000"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 font-medium">Descrição</label>
            <textarea
              className="border-2 w-full rounded-md h-24 px-2"
              {...register("description")}
              name="description"
              id="description"
              placeholder="Digite a descrição completa sobre o carro..."
            >
              {errors.description && (
                <span className="mb-1 text-red-500">
                  {errors.description.message}
                </span>
              )}
            </textarea>
          </div>

          <button
            type="submit"
            className="w-full h-10 rounded-md bg-zinc-900 text-white font-medium"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}
