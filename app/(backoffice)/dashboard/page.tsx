import { ColorTest } from '@/components/ColorTest';
import { ProfileForm } from '@/components/form/ProfileForm';

const PageDashboard = async ({ params:{resources} }:{
  params:{
    resources: string
  }
}) => {

  return (
    <main>
      <ProfileForm />
      <ColorTest />
    </main>
  );
};

export default PageDashboard;
