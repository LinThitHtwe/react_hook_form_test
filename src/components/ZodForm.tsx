import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "It should at least be 3 character"),
  email: z
    .string({ required_error: "Email is required" })
    .min(2, "Email should be at east 2 workds")
    .email("Invalid Email format"),
});

type FormValues = {
  username: string;
  email: string;
};

const ZodForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "HIHI",
      email: "smth",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const { handleSubmit, formState, register } = form;
  const { errors } = formState;
  return (
    <div>
      <h1>Zod Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" id="username" {...register("username")} />
        <p>{errors.username?.message}</p>

        <input type="text" id="email" {...register("email")} />
        <p>{errors.email?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default ZodForm;
