
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md p-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="bg-[#27AD95] hover:bg-[#27AD95]/90 w-full sm:w-auto"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Link to="/diary">
              View My Diary
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
