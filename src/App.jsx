import React, { useState, lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Superpowers from './components/Superpowers';
import Footer from './components/Footer';
import LinuxBootKatanaIntro from './components/LinuxBootKatanaIntro';
import FallingSakuraLeaves from './components/FallingSakuraLeaves';
import CursorSwordSlash from './components/CursorSwordSlash';
import DecorativeBranches, { SectionSakuraDivider } from './components/DecorativeBranches';

const InteractiveTourGuide = lazy(() => import('./components/InteractiveTourGuide'));
const AtsResumeModal = lazy(() => import('./components/AtsResumeModal'));
const ImageModal = lazy(() => import('./components/ImageModal'));

const BOOT_SEEN_KEY = 'mhdomar_boot_seen';

function shouldPlayBootIntro() {
  if (typeof window === 'undefined') return true;
  const params = new URLSearchParams(window.location.search);
  if (params.has('noboot')) return false;
  if (params.has('boot')) return true;
  try {
    if (window.sessionStorage.getItem(BOOT_SEEN_KEY) === '1') {
      return false;
    }
  } catch {
    // Ignore restricted sessionStorage environments
  }
  return true;
}

export default function App() {
  const [tourOpen, setTourOpen] = useState(false);
  const [tourMounted, setTourMounted] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeMounted, setResumeMounted] = useState(false);
  const [bootIntroOpen, setBootIntroOpen] = useState(shouldPlayBootIntro);
  const [modalImage, setModalImage] = useState({ isOpen: false, src: '', title: '' });
  const [imageModalMounted, setImageModalMounted] = useState(false);
  const [proofRequest, setProofRequest] = useState(null);

  const handleCloseBoot = () => {
    try {
      window.sessionStorage.setItem(BOOT_SEEN_KEY, '1');
    } catch {
      // Ignore restricted sessionStorage environments
    }
    setBootIntroOpen(false);
  };

  const handleOpenTour = () => {
    setTourMounted(true);
    setTourOpen(true);
  };

  const handleOpenResume = () => {
    setResumeMounted(true);
    setResumeModalOpen(true);
  };

  const handleOpenImage = (src, title) => {
    setImageModalMounted(true);
    setModalImage({ isOpen: true, src, title });
  };

  const handleCloseImage = () => {
    setModalImage((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell theme-editorial paper-noise min-h-screen relative overflow-x-clip selection:bg-terracotta-500 selection:text-white">
        {/* Epic Linux Boot Sequence, Terminal Typing, and Pixel-Art Katana Unsheath */}
        <LinuxBootKatanaIntro
          isOpen={bootIntroOpen}
          onClose={handleCloseBoot}
        />

        {/* Decorative Japanese Ink Sakura Branches */}
        <DecorativeBranches />

        {/* Falling Sakura / Terracotta Leaves */}
        <FallingSakuraLeaves />

        {/* Interactive Cursor Sword Slashes Layer */}
        <CursorSwordSlash />

        {/* Top Sticky Navbar with Theme Toggle, Hanging Katana, and Resume */}
        <Navbar
          onStartTour={handleOpenTour}
          onOpenResume={handleOpenResume}
        />

        {/* Main Content Sections */}
        <main className="relative z-10">
          {/* Section 1: Hero with Editorial Typographic Layout and Sun Aura */}
          <Hero
            isReady={!bootIntroOpen}
            onStartTour={handleOpenTour}
            onSelectImage={handleOpenImage}
          />

          {/* Sakura Section Divider Flourish */}
          <SectionSakuraDivider />

          {/* Section 2: Selected Production Systems & Architecture Blueprints */}
          <Projects
            onSelectImage={handleOpenImage}
            proofRequest={proofRequest}
          />

          {/* Sakura Section Divider Flourish (Flipped) */}
          <SectionSakuraDivider flip />

          {/* Section 3: Grounded Student Engineer Journey, Podiums & ATS Resume */}
          <About
            onSelectImage={handleOpenImage}
            onOpenResume={handleOpenResume}
            proofRequest={proofRequest}
          />

          {/* Sakura Section Divider Flourish */}
          <SectionSakuraDivider />

          {/* Section 4: Technical Arsenal & System Tooling */}
          <Superpowers onSelectProof={setProofRequest} />
        </main>

        {/* Global Footer */}
        <Footer
          onOpenResume={handleOpenResume}
          onReplayIntro={() => setBootIntroOpen(true)}
        />

        {/* Lazy-Loaded Overlays (kept mounted once triggered so exit animations complete) */}
        <Suspense fallback={null}>
          {tourMounted && (
            <InteractiveTourGuide
              isOpen={tourOpen}
              onClose={() => setTourOpen(false)}
            />
          )}

          {resumeMounted && (
            <AtsResumeModal
              isOpen={resumeModalOpen}
              onClose={() => setResumeModalOpen(false)}
            />
          )}

          {imageModalMounted && (
            <ImageModal
              isOpen={modalImage.isOpen}
              imageSrc={modalImage.src}
              title={modalImage.title}
              onClose={handleCloseImage}
            />
          )}
        </Suspense>
      </div>
    </MotionConfig>
  );
}
