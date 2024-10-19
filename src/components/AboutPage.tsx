import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Cpu, Mail } from "lucide-react";
import WEBSITE_DATA from "@/utils/config";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Icons } from "./ui/icons";

export default function AboutPage({ content }: { content: any }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-800 dark:text-primary-200">
        Sobre {WEBSITE_DATA.siteMetadataHeaderTitle}
      </h1>

      <div className="max-w-3xl mx-auto mb-12 prose prose-lg dark:prose-invert ">
        <BlocksRenderer content={content.content[0].body} />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <DollarSign className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-primary-800 dark:text-primary-200">
              Finanzas
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Exploro las últimas tendencias en finanzas personales, inversiones
              y mercados financieros, con el objetivo de ayudarte a tomar
              decisiones informadas sobre tu dinero.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <Cpu className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-primary-800 dark:text-primary-200">
              Tecnología
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Cubro las innovaciones más recientes en tecnología financiera,
              desde blockchain y criptomonedas hasta aplicaciones de banca móvil
              y plataformas de inversión en línea.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-primary-50 dark:bg-primary-900 rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary-800 dark:text-primary-200">
          Mi Misión
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
          En {WEBSITE_DATA.siteMetadataHeaderTitle}, me dedico a desmitificar el
          mundo de las finanzas tecnológicas, proporcionando contenido accesible
          y accionable que empodere a los lectores para prosperar en la era
          digital.
        </p>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6 text-primary-800 dark:text-primary-200">
          Sobre el Autor
        </h2>
        <Card className="bg-white dark:bg-gray-800 max-w-md mx-auto">
          <CardContent className="p-6">
            <img
              src={content.author.avatar.url ?? ""}
              alt="Foto del Autor"
              className="w-32 h-32 rounded-full mx-auto mb-4"
              width={content.author.width}
              height={content.author.height}
            />
            <h3 className="text-xl font-semibold mb-1 text-primary-800 dark:text-primary-200">
              {content.author.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Fundador y Editor de {WEBSITE_DATA.siteMetadataHeaderTitle}
            </p>
            <strong>{content.author.occupation}</strong>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {content.author.shortBio}
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href={content.author.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon">
                  <Icons.gitHub className="h-4 w-4" />
                </Button>
              </a>
              <a
                href={content.author.linkedin ?? ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon">
                  <Icons.linkedin className="h-4 w-4" />
                </Button>
              </a>
              <a
                href={content.author.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon">
                  <Icons.twitter className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-primary-800 dark:text-primary-200">
          Contáctame
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          ¿Tienes preguntas, sugerencias o propuestas de colaboración? No dudes
          en ponerte en contacto conmigo.
        </p>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white">
          <Mail className="mr-2 h-4 w-4" /> Envíame un correo
        </Button>
      </div>
    </div>
  );
}
