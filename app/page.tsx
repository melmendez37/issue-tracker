import Link from 'next/link';
import { Button } from '@radix-ui/themes';

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-4">Welcome to Issue Tracker</h1>
        <p className="text-lg text-muted-foreground">
          Manage and track issues efficiently with our simple and intuitive Issue Tracker. Create new issues, view all reported problems, and stay organized. Get started by exploring your issues or creating a new one.
        </p>
      </div>
      <Button size="3">
        <Link href="/issues">View Issues</Link>
      </Button>
    </div>
  )
}
