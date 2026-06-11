import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { useLanguage } from "../i18n/LanguageContext";
import { Globe, Palette } from "lucide-react";
import { useState, useEffect } from "react";

export function Settings() {
  const { language, setLanguage, t } = useLanguage();
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("nexus-theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("nexus-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          {t('settings_title')}
        </h1>
        <p style={{ color: 'var(--muted-foreground)' }}>
          Gérez les préférences de votre application
        </p>
      </div>

      <div className="space-y-6">
        {/* Language Settings */}
        <Card style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
              <Globe size={20} style={{ color: '#7c3aed' }} />
              {t('language_settings')}
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              {t('select_language')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="language" style={{ color: 'var(--foreground)' }}>
                  Langue / Language / اللغة
                </Label>
                <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                  <SelectTrigger
                    id="language"
                    className="w-48"
                    style={{
                      background: 'var(--background)',
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)'
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: 'var(--popover)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <SelectItem value="fr">
                      🇫🇷 Français
                    </SelectItem>
                    <SelectItem value="en">
                      🇬🇧 English
                    </SelectItem>
                    <SelectItem value="ar">
                      🇸🇦 العربية
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
              <Palette size={20} style={{ color: '#7c3aed' }} />
              {t('theme_settings')}
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Choisissez entre le mode clair et sombre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="theme-toggle" style={{ color: 'var(--foreground)' }}>
                  {dark ? t('dark_mode') : t('light_mode')}
                </Label>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {dark
                    ? "Interface sombre pour réduire la fatigue oculaire"
                    : "Interface claire pour une meilleure visibilité"}
                </p>
              </div>
              <Switch
                id="theme-toggle"
                checked={dark}
                onCheckedChange={setDark}
              />
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(168,85,247,0.05))',
            borderColor: 'rgba(124,58,237,0.3)',
          }}
        >
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
              >
                <span className="text-lg">💡</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: '#7c3aed' }}>
                  Vos préférences sont sauvegardées
                </h3>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Tous les paramètres sont enregistrés localement dans votre navigateur et seront
                  conservés lors de vos prochaines visites.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
