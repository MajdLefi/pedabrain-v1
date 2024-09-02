import { Helmet } from 'react-helmet-async';
import { SessionDemand } from 'src/components/apps/parent/sessions/session-demand/view';

export default function SessionsPage() {
  return (
    <>
    <Helmet>
      <title> Sessions | PEDABRAIN </title>
    </Helmet>

    <SessionDemand />
  </>
  )
}
