
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';

const AuthButtons: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <Link to="/login">
        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
          <LogIn className="mr-1 h-4 w-4" />
          登录
        </Button>
      </Link>
      <Link to="/register">
        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
          <UserPlus className="mr-1 h-4 w-4" />
          注册
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
