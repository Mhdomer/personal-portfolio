import React from 'react';
import { Composition } from 'remotion';
import { SecrhShowcase } from './SecrhShowcase';
import { A2Showcase } from './A2Showcase';
import { AegisShowcase } from './AegisShowcase';
import { MindcraftShowcase } from './MindcraftShowcase';

export function Root() {
  return (
    <>
      {/* 1. SECRH Healthcare PDMS AWS Migration */}
      <Composition
        id="SecrhShowcase"
        component={SecrhShowcase}
        durationInFrames={480}
        fps={30}
        width={1200}
        height={825}
      />

      {/* 2. A2 EventBridge Remediation Engine */}
      <Composition
        id="A2Showcase"
        component={A2Showcase}
        durationInFrames={540}
        fps={30}
        width={1200}
        height={825}
      />

      {/* 3. Aegis-2B AI Circuit Breaker */}
      <Composition
        id="AegisShowcase"
        component={AegisShowcase}
        durationInFrames={540}
        fps={30}
        width={1200}
        height={825}
      />

      {/* 4. MindCraft 3-Tier CI/CD Security Gate */}
      <Composition
        id="MindcraftShowcase"
        component={MindcraftShowcase}
        durationInFrames={480}
        fps={30}
        width={1200}
        height={825}
      />
    </>
  );
}
