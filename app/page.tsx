import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Lightbulb, Award, HeadphonesIcon, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">PublishResearch.org</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm hover:text-primary transition-colors">
              About
            </a>
            <a href="#services" className="text-sm hover:text-primary transition-colors">
              Blog
            </a>
            <Button size="sm" className="rounded-full" asChild>
              <a href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
              Empowering Young Researchers to Publish Real Science
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mentorship, tools, and personalized guidance: 100% access. Build research from idea to publication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button size="lg" className="rounded-full text-base" asChild>
                <a href="/dashboard">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-semibold"
                    >
                      {i === 5 ? "+" : ""}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Based on 20K+ Reviews</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <Image
                src="/images/image.png"
                alt="Young researcher and professor collaborating"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* University Affiliations */}
      <section className="py-12 border-y border-border bg-card">
        <div className="container mx-auto px-4 max-w-7xl">
          <p className="text-center text-sm text-muted-foreground mb-8">Made by Researchers Affiliated with</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {["MIT", "Penn", "Carnegie Mellon", "Cornell"].map((uni) => (
              <div key={uni} className="text-2xl font-bold text-muted-foreground">
                {uni}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-sm uppercase tracking-wider text-primary mb-4">About us</p>
          <p className="text-xl md:text-2xl leading-relaxed text-foreground">
            Founded by published researchers, PublishResearch.org is a comprehensive platform created to support and
            nurture the next generation of young researchers. We provide clarity, confidence, and expert-backed guidance
            from initial idea to academic publication.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-primary mb-4">Benefits</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Grow your research journey with mentorship and tools that empower you to publish
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Feature Cards */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Mentorship</h3>
              <p className="text-muted-foreground leading-relaxed">
                One-on-one guidance from experienced researchers who help shape your ideas into publishable work.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cutting-Edge Resources</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access templates, LaTeX support, and submission guides modeled after top academic conferences and
                journals.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Expertise</h3>
              <p className="text-muted-foreground leading-relaxed">
                Learn from graduate students and published academics who understand the publishing process inside and
                out.
              </p>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <HeadphonesIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                From brainstorming to peer-review prep, we streamline every step of the research and publication
                process.
              </p>
            </Card>

            <Card className="md:col-span-2 bg-primary text-primary-foreground p-8 hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Ready to publish your first paper?</h3>
                <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                  Our commitment to mentorship and innovation helps students turn projects into real academic
                  contributions.
                </p>
                <Button size="lg" variant="secondary" className="rounded-full" asChild>
                  <a href="/dashboard">Get Started Today</a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-primary mb-4">Services</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Research support made simple</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer a wide range of expert-led programs and resources designed to support every step of your research
              and publication journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                image: "/student-looking-at-lightbulb-drawing.jpg",
                title: "Idea Development",
                description: "Transform your research concepts into structured, publishable work with expert guidance.",
              },
              {
                image: "/hand-writing-research-paper.jpg",
                title: "Writing Support",
                description: "Get help crafting clear, compelling manuscripts that meet publication standards.",
              },
              {
                image: "/laptop-coffee-books-study.jpg",
                title: "Submission Guidance",
                description: "Navigate the submission process with confidence using our proven strategies.",
              },
            ].map((service, i) => (
              <Card key={i} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">PublishResearch.org</span>
            </div>
            <nav className="flex gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            © 2026 PublishResearch.org. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
