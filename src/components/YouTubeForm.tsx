import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type Props = {};
type FormValue = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNums: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const YouTubeForm = (props: Props) => {
  const form = useForm<FormValue>({
    // defaultValues: {
    //   username: "somehting",
    //   email: "",
    //   channel: "",
    // },
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: data.username,
        email: data.email,
        channel: "test",
        social: {
          twitter: "a",
          facebook: "ad",
        },
        phoneNumbers: ["", ""],
        phNums: [{ number: "" }],
        age: 0,
        dob: new Date(),
      };
    },
  });
  const { register, control, handleSubmit, formState } = form;
  //  const { name, ref, onChange, onBlur } = register("username");
  const { errors } = formState;
  const onSubmit = (data: FormValue) => {
    //alert("hi");
    console.log(data);
  };

  const { fields, append, remove } = useFieldArray({
    name: "phNums",
    control,
  });
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>UserName</label>
        <input
          id="username"
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
        />
        <p>{errors.username?.message}</p>

        <label>Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid Email Address",
            },
            // validate: (fieldValue) => {
            //   return (
            //     fieldValue !== "admin@gmail.com" || "Enter differnet Address"
            //   );
            // },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@gmail.com" || "Enter differnet Address"
                );
              },
              notBlackListed: (fieldValue) => {
                return fieldValue != "a@gmail.com" || " I Ban You";
              },
            },
          })}
        />

        <p>{errors.email?.message}</p>

        <label>Channel</label>
        <input
          id="channel"
          type="text"
          {...register("channel", {
            required: "Channel is Require",
          })}
        />

        <p>{errors.channel?.message}</p>

        <label>Twitter</label>
        <input
          id="twitter"
          type="text"
          {...register("social.twitter", {
            required: "Twitter is Require",
          })}
        />

        <label>Age</label>
        <input
          id="age"
          type="number"
          {...register("age", {
            valueAsNumber: true,
          })}
        />

        <label>DOB</label>
        <input
          id="dob"
          type="date"
          {...register("dob", {
            valueAsDate: true,
          })}
        />

        <p>{errors.social?.twitter?.message}</p>

        <label>FB</label>
        <input
          id="facebook"
          type="text"
          {...register("social.facebook", {
            required: "Twitter is Require",
          })}
        />

        <p>{errors.social?.twitter?.message}</p>

        <label>Primary Ph No</label>
        <input id="primary-phone" type="text" {...register("phoneNumbers.0")} />

        <label>Primary Ph No</label>
        <input id="primary-phone" type="text" {...register("phoneNumbers.1")} />
        <p>{errors.social?.twitter?.message}</p>

        <label>List of Ph no</label>
        <div>
          {fields.map((field, index) => (
            <>
              <input
                key={index}
                type="text"
                {...register(`phNums.${index}.number` as const)}
              />
              {index > 0 && (
                <button onClick={() => remove(index)}> Remove Phnum</button>
              )}
            </>
          ))}
        </div>
        <button onClick={() => append({ number: "" })}>
          {" "}
          Add phone numbers
        </button>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
