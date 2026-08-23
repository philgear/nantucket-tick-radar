import { ICoInfectionScore, TickSpecies } from '../types.js';

export interface ISymptomInput {
  hasErythemaMigrans?: boolean;      // Expanding >5cm bullseye or solid red rash
  hasFeverChills?: boolean;          // Spiking fevers / rigors
  hasDrenchingSweats?: boolean;      // Severe night drenching sweats (Babesia hallmark)
  hasDarkUrineJaundice?: boolean;    // Hemolytic sign (Babesia hallmark)
  hasJointPainSwelling?: boolean;    // Asymmetric joint swelling / migratory arthralgias
  hasHeadachePhotophobia?: boolean;  // Severe head pain / light sensitivity
  hasFacialDroop?: boolean;          // Bell's palsy (Lyme hallmark)
  hasRedMeatAllergy?: boolean;       // Delayed hives/GI pain 4-6h after mammalian meat
  attachmentHours?: number;          // Hours tick was attached
}

export function computeCoInfectionRadar(
  species: TickSpecies,
  symptoms: ISymptomInput = {},
  trailRiskMultiplier = 1.0
): ICoInfectionScore[] {
  const isBlacklegged = species === 'ixodes_nymph' || species === 'ixodes_adult';
  const isLoneStar = species === 'amblyomma_lonestar';
  const isDogTick = species === 'dermacentor_dog';
  const hours = symptoms.attachmentHours || 0;

  // ─── 1. Lyme Disease (Borrelia burgdorferi) ──────────────────────
  let lymeProb = 0;
  if (isBlacklegged) {
    lymeProb = hours >= 36 ? 35 : (hours >= 24 ? 15 : 5);
    if (symptoms.hasErythemaMigrans) lymeProb += 55;
    if (symptoms.hasFacialDroop) lymeProb += 40;
    if (symptoms.hasJointPainSwelling) lymeProb += 25;
    if (symptoms.hasFeverChills) lymeProb += 15;
  }
  lymeProb = Math.min(98, Math.round(lymeProb * trailRiskMultiplier));

  // ─── 2. Babesiosis (Babesia microti) ──────────────────────────────
  let babesiaProb = 0;
  if (isBlacklegged) {
    babesiaProb = hours >= 36 ? 18 : (hours >= 24 ? 8 : 2);
    if (symptoms.hasDrenchingSweats) babesiaProb += 50;
    if (symptoms.hasDarkUrineJaundice) babesiaProb += 45;
    if (symptoms.hasFeverChills) babesiaProb += 20;
    if (symptoms.hasErythemaMigrans) babesiaProb += 10; // Co-infection synergy
  }
  babesiaProb = Math.min(95, Math.round(babesiaProb * trailRiskMultiplier));

  // ─── 3. Anaplasmosis (Anaplasma phagocytophilum) ──────────────────
  let anaplasmaProb = 0;
  if (isBlacklegged) {
    anaplasmaProb = hours >= 24 ? 12 : 3;
    if (symptoms.hasFeverChills && symptoms.hasHeadachePhotophobia) anaplasmaProb += 35;
    if (symptoms.hasJointPainSwelling) anaplasmaProb += 15;
  }
  anaplasmaProb = Math.min(90, Math.round(anaplasmaProb * trailRiskMultiplier));

  // ─── 4. Borrelia miyamotoi (Relapsing Fever Spirochete) ───────────
  let miyamotoiProb = 0;
  if (isBlacklegged) {
    miyamotoiProb = hours >= 24 ? 8 : 2;
    if (symptoms.hasFeverChills && symptoms.hasHeadachePhotophobia && !symptoms.hasErythemaMigrans) {
      miyamotoiProb += 30; // Miyamotoi rarely produces typical EM rash
    }
  }
  miyamotoiProb = Math.min(80, Math.round(miyamotoiProb * trailRiskMultiplier));

  // ─── 5. Powassan Virus / Deer Tick Virus (Flavivirus) ────────────
  let powassanProb = 0;
  if (isBlacklegged) {
    // Powassan can transmit in as little as 15 minutes!
    powassanProb = hours > 0 ? 3 : 0;
    if (symptoms.hasHeadachePhotophobia && symptoms.hasFeverChills && (symptoms.hasFacialDroop || symptoms.hasDrenchingSweats)) {
      powassanProb += 25; // Neurologic encephalitis signs
    }
  }
  powassanProb = Math.min(75, Math.round(powassanProb * trailRiskMultiplier));

  // ─── 6. Alpha-Gal Syndrome (Galactose-alpha-1,3-galactose) ────────
  let alphaGalProb = 0;
  if (isLoneStar) {
    alphaGalProb = 30;
    if (symptoms.hasRedMeatAllergy) alphaGalProb += 60;
  } else if (isBlacklegged && symptoms.hasRedMeatAllergy) {
    alphaGalProb = 20; // rare cross-reactivity or unrecognized Lone Star bite
  }
  alphaGalProb = Math.min(95, alphaGalProb);

  const getRiskLevel = (prob: number) => {
    if (prob >= 70) return 'Critically Elevated';
    if (prob >= 40) return 'Elevated';
    if (prob >= 15) return 'Moderate';
    return 'Low';
  };

  return [
    {
      pathogenId: 'lyme_borrelia',
      pathogenName: 'Lyme Disease',
      organism: 'Borrelia burgdorferi (Spirochete)',
      probabilityPercent: lymeProb,
      riskLevel: getRiskLevel(lymeProb),
      clinicalFlag: symptoms.hasErythemaMigrans ? '🎯 Erythema Migrans Rash Reported (Clinically Diagnostic)' : 'Standard Endemic Exposure',
      recommendedAction: lymeProb >= 40 
        ? 'Immediate clinical consultation. 10–14 day oral Doxycycline or Amoxicillin regimen indicated if clinically confirmed.'
        : '30-day monitoring for expanding annular rash (>5cm), fever, or joint pain.'
    },
    {
      pathogenId: 'babesiosis',
      pathogenName: 'Babesiosis',
      organism: 'Babesia microti (Intraerythrocytic Protozoan)',
      probabilityPercent: babesiaProb,
      riskLevel: getRiskLevel(babesiaProb),
      clinicalFlag: symptoms.hasDrenchingSweats || symptoms.hasDarkUrineJaundice 
        ? '🚨 Hemolytic / Drenching Sweats Alert (Protozoan Crisis Risk)'
        : 'Co-Infection Surveillance',
      recommendedAction: babesiaProb >= 40
        ? 'Urgent Giemsa blood smear microscopy / Babesia PCR. Requires Atovaquone + Azithromycin (Lyme antibiotics are ineffective).'
        : 'Monitor for hemolytic signs (dark urine, severe fatigue, drenching night chills).'
    },
    {
      pathogenId: 'anaplasmosis',
      pathogenName: 'Anaplasmosis (HGA)',
      organism: 'Anaplasma phagocytophilum (Intracellular Bacterium)',
      probabilityPercent: anaplasmaProb,
      riskLevel: getRiskLevel(anaplasmaProb),
      clinicalFlag: symptoms.hasFeverChills && symptoms.hasHeadachePhotophobia ? 'Leukopenia / Transaminitis Vector' : 'Baseline Exposure',
      recommendedAction: anaplasmaProb >= 40
        ? 'Order Complete Blood Count (CBC) and hepatic panel (AST/ALT). Oral Doxycycline is first-line.'
        : 'Monitor for abrupt onset high fever and severe muscle aches.'
    },
    {
      pathogenId: 'miyamotoi',
      pathogenName: 'Borrelia miyamotoi Disease',
      organism: 'Borrelia miyamotoi (Relapsing Fever Group)',
      probabilityPercent: miyamotoiProb,
      riskLevel: getRiskLevel(miyamotoiProb),
      clinicalFlag: 'Relapsing Febrile Episode Risk',
      recommendedAction: miyamotoiProb >= 40
        ? 'Miyamotoi PCR testing. Responsive to standard Doxycycline therapy.'
        : 'Monitor for recurring fever spikes every 3 to 7 days.'
    },
    {
      pathogenId: 'powassan',
      pathogenName: 'Deer Tick Virus (Powassan Lineage II)',
      organism: 'Powassan Virus (Flavivirus)',
      probabilityPercent: powassanProb,
      riskLevel: getRiskLevel(powassanProb),
      clinicalFlag: 'Rapid Transmission Arbovirus (<15 min)',
      recommendedAction: powassanProb >= 30
        ? 'Immediate emergency neurology evaluation if confusion, severe ataxia, or neck rigidity occurs. Supportive care.'
        : 'Extremely rare on Nantucket (<1-2%), but rapid attachment risk warrants immediate tick removal.'
    },
    {
      pathogenId: 'alpha_gal',
      pathogenName: 'Alpha-Gal Syndrome (Mammalian Meat Allergy)',
      organism: 'Galactose-α-1,3-galactose (Carbohydrate sensitization)',
      probabilityPercent: alphaGalProb,
      riskLevel: getRiskLevel(alphaGalProb),
      clinicalFlag: symptoms.hasRedMeatAllergy ? '🍖 Delayed Anaphylaxis / GI Cramping Flag' : 'Lone Star Vector Marker',
      recommendedAction: alphaGalProb >= 40
        ? 'Order serum IgE to Alpha-Gal. Avoid beef, pork, lamb, and mammalian gelatin products pending allergy consultation.'
        : 'Check for Lone Star tick white dorsal dot on adult females.'
    }
  ];
}
