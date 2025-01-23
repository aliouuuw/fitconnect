import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loader;
