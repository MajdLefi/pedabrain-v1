import { Helmet } from 'react-helmet-async';
import { UserView } from 'src/components/users/kids/view';

export default function KidsPage() {
  return (
    <>
    <Helmet>
      <title> Enfants | PEDABRAIN </title>
    </Helmet>

    <UserView />
  </>
  )
}
