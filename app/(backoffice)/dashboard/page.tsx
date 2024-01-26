import { ColorTest } from '@/components/ColorTest';
import { ProfileForm } from '@/components/form/ProfileForm';

const PageDashboard = async ({ params:{resources} }:{
  params:{
    resources: string
  }
}) => {

  return (
    <>
      <ProfileForm />
      <ColorTest />
    </>
  );
};

export default PageDashboard;
