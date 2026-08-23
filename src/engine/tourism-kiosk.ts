/**
 * 🏛️ Nantucket Ferry Terminal & Visitor Center Interactive Tourism Kiosk
 * High-engagement touch kiosk for island trail safety, ecology storytelling, and family education.
 */

export interface IKioskStoryChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  icon: string;
  themeColor: string;
  badge: string;
  headline: string;
  storyParagraphs: string[];
  interactiveWidgetType: 'story_card' | 'armor_physics' | 'clock_kinetics' | 'trail_finder' | 'waffle_grid' | 'hospital_card';
  familyActionStep: string;
  heroImageUrl?: string;
}

export const KIOSK_STORY_CHAPTERS: IKioskStoryChapter[] = [
  {
    id: 'chapter_1_moorlands',
    chapterNumber: 1,
    title: 'The Ancient Moorlands',
    subtitle: 'A Globally Rare Sandplain Island Commons',
    icon: '🌾',
    themeColor: '#34d399',
    badge: 'ISLAND HERITAGE & ECOLOGY',
    headline: 'Welcome to Nantucket: Where Glacial Winds Shaped a Rare Ecosystem',
    storyParagraphs: [
      'Over 14,000 years ago, retreating glaciers left behind Nantucket’s rolling sandy plains, coastal heathlands, and freshwater kettle bogs.',
      'Today, the Nantucket Moors are among the rarest ecosystems on Earth, harboring endangered wildflowers, regal fritillary butterflies, and short-eared owls.',
      'As visitors and families, we practice the **Seven Generations principle**: exploring the beauty of our island commons while taking simple, evidence-based steps to keep our families safe and the landscape thriving.'
    ],
    interactiveWidgetType: 'story_card',
    familyActionStep: 'Stay on established sand paths and paved bike paths when exploring coastal heathlands.'
  },
  {
    id: 'chapter_2_armor_lab',
    chapterNumber: 2,
    title: 'The Armor Lab',
    subtitle: 'Permethrin Socks & Repellent Physics',
    icon: '🛡️',
    themeColor: '#38bdf8',
    badge: 'FAMILY TRAIL DEFENSE',
    headline: 'Building Your Trail Armor: How Permethrin Keeps Ticks at Bay',
    storyParagraphs: [
      'Blacklegged tick nymphs quest on the tips of grass at calf and ankle level (4 to 12 inches high). They do not jump, fly, or drop from pine trees.',
      'Treating your sneakers, socks, and hiking cuffs with **Permethrin** creates an invisible defensive shield. When a tick steps onto treated fabric, its nervous system detects a "hot-foot" effect, causing it to curl up and fall off before biting.',
      'Pairing Permethrin socks with EPA-registered **Picaridin (20%)** on exposed skin provides nearly 100% protection during moorland adventures.'
    ],
    interactiveWidgetType: 'armor_physics',
    familyActionStep: 'Spray hiking shoes and socks with Permethrin before leaving your rental home or hotel.'
  },
  {
    id: 'chapter_3_superhero_clock',
    chapterNumber: 3,
    title: 'The 72-Hour Clock',
    subtitle: 'Calm Science for Parents & Caregivers',
    icon: '⏱️',
    themeColor: '#fbbf24',
    badge: 'CALM & CONFIDENT HEALTH',
    headline: 'Finding a Tick is Not an Emergency: You Have Time',
    storyParagraphs: [
      'Many parents panic when finding a tick on their child. But science provides profound peace of mind: **Lyme bacteria (Borrelia burgdorferi) take over 36 hours of attachment to begin transmitting**.',
      'For the first 24 hours, the bacteria are dormant in the tick’s digestive tract. Only after hours of continuous blood feeding does the biological temperature switch activate.',
      'By performing a quick **3-minute nightly tick check** before bedtime stories, you will remove virtually every tick long before transmission is biologically possible.'
    ],
    interactiveWidgetType: 'clock_kinetics',
    familyActionStep: 'Make a quick 3-minute bedtime check (hairline, behind ears, waistband) part of your island evening routine.'
  },
  {
    id: 'chapter_4_trail_desiccation',
    chapterNumber: 4,
    title: 'The Trail Finder',
    subtitle: 'Microclimate Windows & Sunshine Defense',
    icon: '☀️',
    themeColor: '#f97316',
    badge: 'REAL-TIME WEATHER RADAR',
    headline: 'Hiking Smart: When Ocean Breezes Dry the Trails',
    storyParagraphs: [
      'Ticks breathe through microscopic spiracles and lose body moisture rapidly in dry, sunny air. When relative humidity drops below 50%, ticks retreat to underground leaf litter.',
      'Morning fog keeps trails damp and tick activity high. But by early afternoon (1:00 PM – 5:00 PM), sunshine and coastal ocean breezes create a natural "Desiccation Window."',
      'Open bluff trails like **Tupancy Links** and **Sconset Bluff Walk** offer near-zero tick exposure, while deep shaded hardwood swamps (like Squam Swamp) require full sock tucking.'
    ],
    interactiveWidgetType: 'trail_finder',
    familyActionStep: 'Plan moorland forest hikes during sunny, breezy afternoon hours.'
  },
  {
    id: 'chapter_5_100_nymphs',
    chapterNumber: 5,
    title: '100 Nymphs of Nantucket',
    subtitle: 'Empirical Surveillance & Co-Infection Science',
    icon: '🪲',
    themeColor: '#c084fc',
    badge: 'CITIZEN SCIENCE & PCR LABS',
    headline: 'What Do Tested Island Ticks Actually Carry?',
    storyParagraphs: [
      'Through partnerships with the **UMass Amherst TickReport Laboratory** and Massachusetts DPH, thousands of ticks collected on Nantucket are PCR-tested annually.',
      'Approximately **52% of deer tick nymphs carry Borrelia burgdorferi**, while **18% carry Babesia microti** (an intraerythrocytic protozoan) and **11% carry Anaplasma**.',
      'About **9% of ticks carry dual co-infections**. Knowing this empowers Nantucket Cottage Hospital physicians to order comprehensive diagnostic panels if fevers persist.'
    ],
    interactiveWidgetType: 'waffle_grid',
    familyActionStep: 'Save removed ticks in a ziplock bag with a damp blade of grass for easy clinical identification.'
  },
  {
    id: 'chapter_6_hospital_intake',
    chapterNumber: 6,
    title: 'Hospital Walk-In Guide',
    subtitle: 'Cottage Hospital Access & Doxycycline Rules',
    icon: '🏥',
    themeColor: '#f87171',
    badge: 'ISLAND CLINICAL SUPPORT',
    headline: 'Nantucket Cottage Hospital (NCH): World-Class Island Care',
    storyParagraphs: [
      'If you discover a tick that has been attached for **36 hours or longer** (or is visibly engorged like a watermelon seed), you are eligible for **single-dose Doxycycline 200mg prophylaxis** per IDSA guidelines.',
      'The **NCH Walk-In Clinic at 57 Prospect Street** is open 7 days a week with expert triage nurses and physicians who specialize in rapid vector evaluation.',
      'No appointment is necessary; single-dose prophylaxis taken within 72 hours of removal reduces Lyme transmission risk by over 87%.'
    ],
    interactiveWidgetType: 'hospital_card',
    familyActionStep: 'Call (508) 825-1000 for NCH Walk-In hours or visit 57 Prospect St if attached >=36h.'
  }
];

export class TourismKioskEngine {
  private activeChapterIndex = 0;
  private isScreensaverActive = false;
  private idleTimer: any = null;
  private readonly IDLE_TIMEOUT_MS = 90000; // 90 seconds auto-screensaver

  public getActiveChapter(): IKioskStoryChapter {
    return KIOSK_STORY_CHAPTERS[this.activeChapterIndex] || KIOSK_STORY_CHAPTERS[0];
  }

  public getAllChapters(): IKioskStoryChapter[] {
    return KIOSK_STORY_CHAPTERS;
  }

  public getChapterIndex(): number {
    return this.activeChapterIndex;
  }

  public setChapterIndex(index: number) {
    if (index >= 0 && index < KIOSK_STORY_CHAPTERS.length) {
      this.activeChapterIndex = index;
      this.resetIdleTimer();
    }
  }

  public nextChapter() {
    this.activeChapterIndex = (this.activeChapterIndex + 1) % KIOSK_STORY_CHAPTERS.length;
    this.resetIdleTimer();
  }

  public prevChapter() {
    this.activeChapterIndex = (this.activeChapterIndex - 1 + KIOSK_STORY_CHAPTERS.length) % KIOSK_STORY_CHAPTERS.length;
    this.resetIdleTimer();
  }

  public getIsScreensaver(): boolean {
    return this.isScreensaverActive;
  }

  public wakeKiosk() {
    this.isScreensaverActive = false;
    this.resetIdleTimer();
  }

  public triggerScreensaver() {
    this.isScreensaverActive = true;
  }

  public resetIdleTimer() {
    if (typeof window === 'undefined') return;
    if (this.idleTimer) clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      this.isScreensaverActive = true;
    }, this.IDLE_TIMEOUT_MS);
  }

  /**
   * Generates a mobile handoff URL for visitors to take with them
   */
  public generateMobileHandoffUrl(chapterId: string): string {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://nantucket-tick-radar-793190615625.us-east1.run.app';
    return `${baseUrl}/?ref=kiosk&chapter=${chapterId}`;
  }
}
