import { SignupForm } from '@/widgets/auth/signup-form';

export const metadata = {
  title: 'Sign Up',
};

const SignupPage: React.FC = () => {
  return (
    <div className="w-full max-w-96">
      <h1 className="sr-only">Sign Up</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
