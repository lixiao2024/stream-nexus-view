
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  FileText,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    
    toast({
      title: "已退出登录",
      description: "您已成功退出管理员账号",
    });
    
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-primary/10 text-primary font-medium' : '';
  };

  return (
    <div className="h-screen w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/20 p-2 rounded-md">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold">管理员面板</h1>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link 
              to="/admin" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${isActive('/admin')}`}
            >
              <Home className="h-5 w-5" />
              <span>控制台</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/articles" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${isActive('/admin/articles')}`}
            >
              <FileText className="h-5 w-5" />
              <span>文章管理</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/courses" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${isActive('/admin/courses')}`}
            >
              <BookOpen className="h-5 w-5" />
              <span>课程管理</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/comments" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${isActive('/admin/comments')}`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>评论管理</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/users" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${isActive('/admin/users')}`}
            >
              <Users className="h-5 w-5" />
              <span>用户管理</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/settings" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${isActive('/admin/settings')}`}
            >
              <Settings className="h-5 w-5" />
              <span>系统设置</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2 w-full rounded-md text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>退出登录</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
