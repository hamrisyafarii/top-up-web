import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {useAuth} from "@/hooks/useAuth";
import CardProfile from "../components/CardProfile";

const ProfilePage = () => {
  const {user, isLoading} = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CardProfile isLoading={isLoading} user={user} />
      <Footer />
    </div>
  );
};

export default ProfilePage;
