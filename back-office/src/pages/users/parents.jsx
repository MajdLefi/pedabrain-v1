import { Helmet } from 'react-helmet-async';
import { UserView } from 'src/components/users/parents/view';

export default function ParentsPage() {
  return (
    <>
    <Helmet>
      <title> Parents | PEDABRAIN </title>
    </Helmet>

    <UserView />
  </>
  )
}
