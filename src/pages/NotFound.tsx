
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 错误：用户尝试访问不存在的路由：",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-md w-full p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-6">
          <FileQuestion className="h-8 w-8 text-blue-400" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          404
        </h1>
        
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-6"></div>
        
        <p className="text-xl text-gray-300 mb-8">虚空之境——未找到请求的页面</p>
        
        <Link to="/">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
            返回灵境主页
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
