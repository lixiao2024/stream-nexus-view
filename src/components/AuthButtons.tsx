
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AuthButtons: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Link to="/login">
        <Button variant="outline" size="sm">登录</Button>
      </Link>
      <Link to="/register">
        <Button size="sm">注册</Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
