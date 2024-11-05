const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grow place-items-center bg-gray-100 p-4">
      {children}
    </div>
  );
};

export default AuthLayout;
