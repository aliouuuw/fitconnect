import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useRouter } from '@/i18n/routing';

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
  showRefreshButton?: boolean;
  refreshButtonText?: string;
  refreshButtonNotice?: string;
}

const Alert = ({ title, iconUrl, showRefreshButton, refreshButtonText = 'Refresh page', refreshButtonNotice = 'Patienter encore et actualiser la page pour réessayer à l&apos;heure de rejoindre la classe' }: PermissionCardProps) => {
  const router = useRouter();
  return (
    <section className="flex flex-col justify-center items-center h-screen w-full bg-secondary">
      <Card className="w-full max-w-[520px] border-none bg-background p-6 py-9">
        <CardContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3.5">
              {iconUrl && (
                <div className="flex-center">
                  <Image src={iconUrl} width={72} height={72} alt="icon" />
                </div>
              )}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
              {showRefreshButton && (
                <>
                  <Button variant="outline" onClick={() => router.refresh()}>
                    {refreshButtonText}
                  </Button>    
                
                  <p className="text-sm text-muted-foreground">
                    {refreshButtonNotice}
                  </p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
