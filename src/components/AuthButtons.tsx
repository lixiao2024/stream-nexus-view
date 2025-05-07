
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, User, LogOut, Settings, Upload } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from '@/components/ui/use-toast';

const AuthButtons: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('用户');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // 检查localStorage中的登录状态和用户信息
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    const avatar = localStorage.getItem('userAvatar');
    const name = localStorage.getItem('userName');
    
    setIsLoggedIn(loggedIn);
    setIsAdmin(userRole === 'admin');
    setUserAvatar(avatar);
    
    if (name) {
      setUserName(name);
    }

    // 添加事件监听器以实时更新头像
    const handleStorageChange = () => {
      const updatedAvatar = localStorage.getItem('userAvatar');
      const updatedName = localStorage.getItem('userName');
      
      setUserAvatar(updatedAvatar);
      if (updatedName) {
        setUserName(updatedName);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 监听自定义事件
    document.addEventListener('avatarUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('avatarUpdated', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setIsAdmin(false);
    
    toast({
      title: "已退出登录",
      description: "您已成功退出账号",
    });
    
    navigate('/');
  };

  if (isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              {userAvatar ? (
                <AvatarImage src={userAvatar} alt={userName} />
              ) : (
                <AvatarFallback className="bg-secondary text-primary">
                  {userName.substring(0, 1).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="hidden md:inline">{isAdmin ? '管理员' : userName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link to="/admin" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>管理控制台</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>个人资料</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>退出登录</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <Link to="/login">
        <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-100">
          <LogIn className="mr-1 h-4 w-4" />
          登录
        </Button>
      </Link>
      <Link to="/register">
        <Button size="sm" className="bg-black hover:bg-black/90 text-white">
          <UserPlus className="mr-1 h-4 w-4" />
          注册
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
