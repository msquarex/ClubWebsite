import { HeroSectionRedesigned } from "@/components/hero-section-redesigned"
import { FeaturedWorkGrid } from "@/components/featured-work-grid"
import { CoreTeamTreeRedesigned } from "@/components/core-team-tree-redesigned"
import { FromTheDesk } from "@/components/from-the-desk"
import { FooterRedesigned } from "@/components/footer-redesigned"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSectionRedesigned />
      <FeaturedWorkGrid />
      <CoreTeamTreeRedesigned />
      <FromTheDesk />
      <FooterRedesigned />
    </div>
  )
}
