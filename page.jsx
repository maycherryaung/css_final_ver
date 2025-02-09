"use client";
import CovidOverviewPage from './components/Overview';
import TableOfContentsPage from './components/TableofContents';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        Welcome to COVID-19 Info Hub
      </h1>
      <CovidOverviewPage />
      <TableOfContentsPage />

    </div>
  );
}


