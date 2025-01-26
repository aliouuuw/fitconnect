import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dumbbell, Users, Video, Calendar } from "lucide-react"
import { Link } from "@/i18n/routing"
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";

export default async function Home() {
  const t = await getTranslations('home');
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login">
                <Button size="lg">{t("hero.getStarted")}</Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">{t("hero.learnMore")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <section id="features" className="py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Dumbbell className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("features.personalizedTraining.title")}</h3>
              <p className="text-muted-foreground">{t("features.personalizedTraining.description")}</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Video className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("features.liveSessions.title")}</h3>
              <p className="text-muted-foreground">{t("features.liveSessions.description")}</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("features.smartScheduling.title")}</h3>
              <p className="text-muted-foreground">{t("features.smartScheduling.description")}</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("features.clientManagement.title")}</h3>
              <p className="text-muted-foreground">{t("features.clientManagement.description")}</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('cta.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10">
              <Link href="/login">
                <Button size="lg" className="px-8">{t('cta.button')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-muted/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">FitConnect</h3>
              <p className="text-muted-foreground">Empowering fitness professionals worldwide.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">{t("footer.about")}</Link></li>
                <li><Link href="/features" className="text-muted-foreground hover:text-primary">{t("footer.features")}</Link></li>
                <li><Link href="/pricing" className="text-muted-foreground hover:text-primary">{t("footer.pricing")}</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">{t("footer.contact")}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-muted-foreground">support@fitconnect.com</p>
              <p className="text-muted-foreground">1-800-FIT-CONN</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} FitConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}