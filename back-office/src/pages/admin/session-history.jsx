import { Helmet } from 'react-helmet-async';
import { SessionHistoryView } from 'src/components/apps/admin/sessions-history/view';

export default function SessionsPage() {
  return (
    <>
    <Helmet>
      <title> Historique des sessions | PEDABRAIN </title>
    </Helmet>

    <SessionHistoryView />
  </>
  )
}
