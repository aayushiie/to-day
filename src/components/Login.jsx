import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => { console.log(data) }

  return (
    <>
      <Link to="/">
        <button>ToDay</button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email
          <input
            {...register("email",
              {
                required: { value: true, message: "Email is mandatory" },
                pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email address." }
              }
            )}
            type='email'
          />
          {errors.email && <div>{errors.email.message}</div>}
        </label>
        <label>
          Password
          <input
            {...register("password",
              {
                required: { value: true, message: "Password is mandatory" },
                minLength: { value: 5, message: "Password should have atleast 5 characters." },
                maxLength: { value: 15, message: "Password should have not exceed 15 characters." },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[@#*!&%])[A-Z][A-Za-z0-9@#*!&%]*$/
                  , message: "Password must start with a capital letter, and contain atleast one number and special character."
                }
              }
            )}
            type='password'
          />
          {errors.password && <div>{errors.password.message}</div>}
        </label>

        <input type="submit" className="" />
      </form>
    </>
  )
}

export default Login
