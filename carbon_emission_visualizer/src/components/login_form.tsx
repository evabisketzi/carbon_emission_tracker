import { type JSX } from "react";
import { Controller, useForm } from "react-hook-form";
import type { LoginDetails } from "../services/user_services";
import './login_form.css';

export function LoginForm(props: {
    onSubmit: (data: LoginDetails) => void
}): JSX.Element {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginDetails>({
        defaultValues: {
            username: "",
            password: ""
        }
    });
  
    return (<form onSubmit={handleSubmit(props.onSubmit)} className="trip-form">
      <h2>User Login</h2>
      <label>
        Username:
        <Controller
          name="username"
          control={control}
          rules={{ required: 'Username is required' }}
          render={({ field }) => <input {...field} />}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
      </label>

      <label>
        Password:
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field }) => <input type="password" {...field} />}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};
