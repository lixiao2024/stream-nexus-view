
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const UsersManagement: React.FC = () => {
  const users = [
    {
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      role: 'user',
      status: 'active',
      registeredAt: '2025-03-15',
    },
    {
      id: '2',
      name: '李四',
      email: 'lisi@example.com',
      role: 'user',
      status: 'active',
      registeredAt: '2025-03-18',
    },
    {
      id: '3',
      name: '王五',
      email: 'wangwu@example.com',
      role: 'user',
      status: 'inactive',
      registeredAt: '2025-03-20',
    },
    {
      id: '4',
      name: 'Admin',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      registeredAt: '2025-01-01',
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">用户管理</h1>
        <p className="text-gray-500">管理系统用户</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>用户名</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead>角色</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>注册日期</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge 
                  variant={user.role === 'admin' ? 'default' : 'outline'}
                  className={user.role === 'admin' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : ''}
                >
                  {user.role === 'admin' ? '管理员' : '普通用户'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={user.status === 'active' ? 'default' : 'outline'}
                  className={user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}
                >
                  {user.status === 'active' ? '活跃' : '未激活'}
                </Badge>
              </TableCell>
              <TableCell>{user.registeredAt}</TableCell>
              <TableCell className="text-right">
                <button className="text-sm text-blue-600 hover:underline mr-3">
                  编辑
                </button>
                {user.role !== 'admin' && (
                  <button className="text-sm text-red-600 hover:underline">
                    禁用
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default UsersManagement;
