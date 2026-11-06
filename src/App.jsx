import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Superpowers from './components/Superpowers';
import Footer from './components/Footer';
import ImageModal from './components/ImageModal';
import AtsResumeModal from './components/AtsResumeModal';
import LinuxBootKatanaIntro from './components/LinuxBootKatanaIntro';
import FallingSakuraLeaves from './components/FallingSakuraLeaves';
import CursorSwordSlash from './components/CursorSwordSlash';
import DecorativeBranches, { SectionSakuraDivider } from './components/DecorativeBranches';
import InteractiveTourGuide from './components/InteractiveTourGuide';
import QuickResumePill from './components/QuickResumePill';

export default function App() {
  const [tourOpen, setTourOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [bootIntroOpen, setBootIntroOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !window.location.search.includes('noboot');
  });
  const [modalImage, setModalImage] = useState({ isOpen: false, src: '', title: '' });

  const handleOpenImage = (src, title) => {
    setModalImage({ isOpen: true, src, title });
  };

  const handleCloseImage = () => {
    setModalImage({ isOpen: false, src: '', title: '' });
  };

  return (
    <div className="site-shell theme-editorial paper-noise min-h-screen relative overflow-x-clip selection:bg-terracotta-500 selection:text-white">
      {/* Epic Linux Boot Sequence, Terminal Typing, and Katana Slice Opening */}
      <LinuxBootKatanaIntro
        isOpen={bootIntroOpen}
        onClose={() => setBootIntroOpen(false)}
      />

      {/* Decorative Japanese Ink Sakura Branches */}
      <DecorativeBranches />

      {/* Falling Sakura / Terracotta Leaves */}
      <FallingSakuraLeaves />

      {/* Interactive Cursor Sword Slashes Layer */}
      <CursorSwordSlash />

      {/* Top Sticky Navbar with Theme Toggle, Lower Hanging Katana, and Tour */}
      <Navbar
        onStartTour={() => setTourOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 1: Hero with Editorial Typographic Layout and Sun Aura */}
        <Hero
          onStartTour={() => setTourOpen(true)}
          onSelectImage={handleOpenImage}
        />

        {/* Sakura Section Divider Flourish */}
        <SectionSakuraDivider />

        {/* Section 2: Selected Production Systems & Architecture Blueprints */}
        <Projects onSelectImage={handleOpenImage} />

        {/* Sakura Section Divider Flourish (Flipped) */}
        <SectionSakuraDivider flip />

        {/* Section 3: Grounded Student Engineer Journey, Podiums & ATS Resume */}
        <About
          onSelectImage={handleOpenImage}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        {/* Sakura Section Divider Flourish */}
        <SectionSakuraDivider />

        {/* Section 4: Technical Arsenal & System Tooling */}
        <Superpowers />
      </main>

      {/* Global Footer */}
      <Footer onOpenResume={() => setResumeModalOpen(true)} />

      {/* Floating Quick Resume Access Pill for Recruiters */}
      <QuickResumePill onOpenResume={() => setResumeModalOpen(true)} />

      {/* Interactive Portfolio Tour */}
      <InteractiveTourGuide
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
      />

      {/* Direct ATS Resume Inspection Modal */}
      <AtsResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* High-Resolution Screenshot Inspection Modal */}
      <ImageModal
        isOpen={modalImage.isOpen}
        imageSrc={modalImage.src}
        title={modalImage.title}
        onClose={handleCloseImage}
      />
    </div>
  );
}
