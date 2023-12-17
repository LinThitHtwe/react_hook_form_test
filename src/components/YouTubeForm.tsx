import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type Props = {};

const YouTubeForm = (props: Props) => {
  const form = useForm();
  const { register, control } = form;
  //  const { name, ref, onChange, onBlur } = register("username");
  return (
    <div>
      <form>
        <label>UserName</label>
        <input id="username" type="text" {...register("username")} />

        <label>Email</label>
        <input type="email" id="email" {...register("email")} />

        <label>Channel</label>
        <input id="channel" type="text" {...register("channel")} />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
