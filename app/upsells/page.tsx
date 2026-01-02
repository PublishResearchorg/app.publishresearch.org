"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Zap, Crown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function UpsellsPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "3 AI peer reviews per month",
        "10 citation searches per month",
        "Basic LaTeX templates",
        "Conference finder access",
        "Community support",
      ],
      cta: "Current Plan",
      disabled: true,
      icon: Sparkles,
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For serious researchers",
      features: [
        "Unlimited AI peer reviews",
        "Unlimited citation searches",
        "50 synthesis runs per month",
        "All premium LaTeX templates",
        "AI LaTeX assistant (100 requests/month)",
        "Priority support",
        "Early access to new features",
      ],
      cta: "Upgrade to Pro",
      disabled: false,
      popular: true,
      icon: Zap,
    },
    {
      name: "Premium",
      price: "$99",
      period: "per month",
      description: "For research teams",
      features: [
        "Everything in Pro",
        "Unlimited synthesis runs",
        "Unlimited AI LaTeX assistant",
        "Team collaboration features",
        "Custom LaTeX templates",
        "1-on-1 mentor sessions (2 per month)",
        "Dedicated account manager",
        "API access",
      ],
      cta: "Contact Sales",
      disabled: false,
      icon: Crown,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-balance">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-3 text-lg">Unlock more features and accelerate your research journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon
          return (
            <Card
              key={plan.name}
              className={`p-8 relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
              )}

              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  disabled={plan.disabled}
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
              prorate any differences.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">Is there a student discount?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Students with a valid .edu email address get 50% off Pro and Premium plans. Contact support to apply
              your discount.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">Can I cancel my subscription?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your
              billing period.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
