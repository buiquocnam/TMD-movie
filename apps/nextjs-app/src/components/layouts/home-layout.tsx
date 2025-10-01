import { Header } from './header';
import { Footer } from './footer';
import { Sidebar } from './sidebar';
import { MainContent } from './main-content';

export const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="">
        <MainContent />
      </div>
      
      <Footer />
    </div>
  );
};

