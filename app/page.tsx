import HomeSection from "@/app/(sections)/home/HomeSection";
import AboutSection from "@/app/(sections)/about/AboutSection";
import SkillsSection from "@/app/(sections)/skills/SkillsSection";
import ServicesSection from "@/app/(sections)/services/ServicesSection";
import ResumeSection from "@/app/(sections)/resume/ResumeSection";
import ProjectsSection from "@/app/(sections)/projects/ProjectsSection";
import CertificatesSection from "@/app/(sections)/certificates/CertificatesSection";
import OtherSection from "@/app/(sections)/other/OtherSection";
import ContactSection from "@/app/(sections)/contact/ContactSection";
import CommentSection from "@/app/(sections)/comments/CommentSection";

export default function Home() {
  return (
    <>
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ResumeSection />
      <ProjectsSection />
      <CertificatesSection />
      <OtherSection />
      <ContactSection />
      <CommentSection />
    </>
  );
}
