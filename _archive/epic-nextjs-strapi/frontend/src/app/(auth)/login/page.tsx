import { LoginForm } from '@/widgets/auth/login-form';

export const metadata = {
  title: 'Login',
};

const LoginPage: React.FC = () => {
  return (
    <div className="w-full max-w-96">
      <h1 className="sr-only">Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
