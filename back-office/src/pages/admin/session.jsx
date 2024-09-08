import { Helmet } from 'react-helmet-async';
import { SessionView } from 'src/components/apps/admin/sessions/view';

export default function SessionsPage() {
  return (
    <>
    <Helmet>
      <title> Sessions | PEDABRAIN </title>
    </Helmet>

    <SessionView />
  </>
  )
}
