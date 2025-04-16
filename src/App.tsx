
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ContentDetail from "./pages/ContentDetail";
import CourseDetail from "./pages/CourseDetail";
import CourseEnrollment from "./pages/CourseEnrollment";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ArticlesManagement from "./pages/admin/ArticlesManagement";
import CoursesManagement from "./pages/admin/CoursesManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import CommentsManagement from "./pages/admin/CommentsManagement";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/content/:id" element={<ContentDetail />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course-enrollment/:id" element={<CourseEnrollment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/articles" element={<ArticlesManagement />} />
          <Route path="/admin/courses" element={<CoursesManagement />} />
          <Route path="/admin/users" element={<UsersManagement />} />
          <Route path="/admin/comments" element={<CommentsManagement />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
