import { Helmet } from 'react-helmet-async';
import { UserView } from 'src/components/users/sessions/view';

export default function SessionsPage() {
  return (
    <>
    <Helmet>
      <title> Sessions | PEDABRAIN </title>
    </Helmet>

    <UserView />
  </>
  )
}
